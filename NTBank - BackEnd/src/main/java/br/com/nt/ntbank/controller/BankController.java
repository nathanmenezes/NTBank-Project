package br.com.nt.ntbank.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.nt.ntbank.dto.ClienteDTO;
import br.com.nt.ntbank.dto.LoginDTO;
import br.com.nt.ntbank.dto.TransacaoDTO;
import br.com.nt.ntbank.dto.TransferenciaDTO;
import br.com.nt.ntbank.model.Conta;
import br.com.nt.ntbank.security.TokenUtil;
import br.com.nt.ntbank.service.BankService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ntbank")
public class BankController {
    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

    @Autowired
    BankService bankService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> salvarConta(@RequestBody @Valid ClienteDTO clienteDTO){
        return bankService.salvarConta(clienteDTO);
    }

    @GetMapping("/listar")
    public List<Conta> listConta(){
        return bankService.findAll();
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarConta(@PathVariable Long id){
        return bankService.deletarConta(id);
    }

    @GetMapping("/usuario")
    public ResponseEntity<?> listarConta(@RequestHeader("Authorization") String token){
        return bankService.listarUmaConta(token.substring(7));
    }

    @GetMapping("usuario/{token}")
    public String teste(@PathVariable String token){
        return "ID: " + TokenUtil.getUserIdFromToken(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> logar(@RequestBody LoginDTO loginDTO){
        return bankService.logar(loginDTO);
    }


    @PutMapping("/transferir")
    public ResponseEntity<?> transferir(@RequestHeader("Authorization") String token, @RequestBody TransferenciaDTO transacao){
        return bankService.transferir(token.substring(7), transacao);
    }

    @PutMapping("/sacar")
    public ResponseEntity<?> sacar(@RequestHeader("Authorization") String token, @RequestBody TransacaoDTO valor){
        return bankService.sacar(token.substring(7), valor);
    }

    @PutMapping("depositar") 
    public ResponseEntity<?> depositar(@RequestHeader("Authorization") String token, @RequestBody TransacaoDTO valor){
        return bankService.depositar(token.substring(7), valor);
    }
    
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationException(MethodArgumentNotValidException e){
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
