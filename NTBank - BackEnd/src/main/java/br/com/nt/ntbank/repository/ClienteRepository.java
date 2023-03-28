package br.com.nt.ntbank.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.nt.ntbank.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);

    Cliente findByEmail(String email);
}
