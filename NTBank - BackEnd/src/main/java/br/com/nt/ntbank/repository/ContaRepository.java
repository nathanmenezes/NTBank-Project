package br.com.nt.ntbank.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.nt.ntbank.model.Cliente;
import br.com.nt.ntbank.model.Conta;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long>{

    Conta findByCliente(Cliente cliente);
}
