package br.com.nt.ntbank.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.nt.ntbank.dto.ClienteDTO;
import br.com.nt.ntbank.dto.LoginDTO;
import br.com.nt.ntbank.dto.TransacaoDTO;
import br.com.nt.ntbank.dto.TransferenciaDTO;
import br.com.nt.ntbank.model.Cliente;
import br.com.nt.ntbank.model.Conta;
import br.com.nt.ntbank.model.Transacao;
import br.com.nt.ntbank.repository.ClienteRepository;
import br.com.nt.ntbank.repository.ContaRepository;
import br.com.nt.ntbank.security.Token;
import br.com.nt.ntbank.security.TokenUtil;

@Service
public class BankService {

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ContaRepository contaRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> salvarConta(@Valid ClienteDTO clienteDTO) {
        if(clienteRepository.existsByCpf(clienteDTO.getCpf())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Cpf já cadastrado!");
        }
        if(clienteRepository.existsByEmail(clienteDTO.getEmail())){
            return ResponseEntity.status(409).body("Conflict: Email já cadastrado!");
        }
        var cliente = new Cliente();
        BeanUtils.copyProperties(clienteDTO, cliente);
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(cliente));
        try {
            cliente.setDataNascimento(sdf.parse(clienteDTO.getDataNascimento()));
            return ResponseEntity.status(HttpStatus.CREATED).body(contaRepository.save(new Conta(cliente)));
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    public ResponseEntity<?> deletarConta(Long id) {
        Optional<Conta> contaOptional = contaRepository.findById(id);
        if(!contaOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conta não encontrada");
        }
        contaRepository.delete(contaOptional.get());
        clienteRepository.delete(contaOptional.get().getCliente());
        return ResponseEntity.status(HttpStatus.OK).body("Conta e cliente deletado com sucesso!");
    }

    public ResponseEntity<?> listarUmaConta(String token) {
        Optional<Conta> contaOptional = contaRepository.findById(TokenUtil.getUserIdFromToken(token));
        if(!contaOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conta não encontrada");
        }
        return ResponseEntity.status(HttpStatus.OK).body(contaOptional.get());
    }


    public Token gerarToken(LoginDTO user) {
        Cliente cliente = clienteRepository.findByEmail(user.getEmail());
        Conta conta = contaRepository.findByCliente(cliente);
        if(conta != null){
            Boolean valid = passwordEncoder.matches(user.getSenha(), conta.getCliente().getSenha());
            if(valid){
                return new Token(TokenUtil.createToken(conta));
            }
        }
        return null;
    }

    public ResponseEntity<?> logar(LoginDTO loginDTO) {
        Token token = gerarToken(loginDTO);
        if(token != null){
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(403).body("ERRO: Credenciais Invalidas");
    }

    public List<Conta> findAll() {
        return contaRepository.findAll();
    }

    public ResponseEntity<?> transferir(String token, TransferenciaDTO transacao) {
        if(TokenUtil.getUserIdFromToken(token) == transacao.getId()){
            return ResponseEntity.status(400).body("Não é possivel transferir para si mesmo!");
        }

        Optional<Conta> destinatario = contaRepository.findById(transacao.getId());

        if(destinatario.isEmpty()){
            return ResponseEntity.status(400).body("Conta de destino não encontrada!");
        }

        Optional<Conta> remetente = contaRepository.findById(TokenUtil.getUserIdFromToken(token));

        if(remetente.get().getSaldo() < transacao.getValor()){
            return ResponseEntity.status(400).body("Saldo insuficiente para a transferencia");
        }

        remetente.get().transferir(destinatario, transacao.getValor());

        remetente.get().getTransacoes().add(new Transacao(LocalDateTime.now(), transacao.getValor(), ("Transferencia efetuada para: " + destinatario.get().getCliente().getNome())));
        destinatario.get().getTransacoes().add(new Transacao(LocalDateTime.now(), transacao.getValor(), ("Transferencia recebida de: " + remetente.get().getCliente().getNome())));
        contaRepository.save(destinatario.get());
        contaRepository.save(remetente.get());

        return ResponseEntity.status(200).body("Transferencia efetuada com sucesso!");
    }

    public ResponseEntity<?> sacar(String token, TransacaoDTO valor) {
        Optional<Conta> conta = contaRepository.findById(TokenUtil.getUserIdFromToken(token));

        if(conta.get().getSaldo() < valor.getValor()){
            return ResponseEntity.status(400).body("Saldo insuficiente para o saque!");
        }

        conta.get().sacar(valor.getValor());
        conta.get().getTransacoes().add(new Transacao(LocalDateTime.now(), valor.getValor(), "Saque"));

        contaRepository.save(conta.get());

        return ResponseEntity.status(200).body("Saque efetuado com sucesso");
    }

    public ResponseEntity<?> depositar(String token, TransacaoDTO valor) {
        Optional<Conta> conta = contaRepository.findById(TokenUtil.getUserIdFromToken(token));

        conta.get().depositar(valor.getValor());

        conta.get().getTransacoes().add(new Transacao(LocalDateTime.now(), valor.getValor(), "Deposito"));

        contaRepository.save(conta.get());

        return ResponseEntity.status(200).body("Deposito efetuado com sucesso");
    }

}
