package br.com.nt.ntbank.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import java.util.List;
import java.util.Optional;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_CONTA")
@Getter
@Setter
public class Conta{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "codigo_cliente", referencedColumnName = "id")
    private Cliente cliente;
    private double saldo = 0;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_conta")
    private List<Transacao> transacoes;
    

    public Conta(){}

    public Conta(Cliente cliente) {
        this.cliente = cliente;
    }

    public void transferir(Optional<Conta> conta, double valor){
        this.saldo -= valor;

        conta.get().saldo += valor;
    }

    public void depositar(double valor){
        saldo += valor;
    }

    public void sacar(double valor){
        saldo -= valor;
    }

}
