package br.com.nt.ntbank.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_TRANSACAO")
@Getter
@Setter
public class Transacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDateTime data;
    private double valor;
    private String descricao;

    public Transacao(){}

    public Transacao(LocalDateTime data, double valor, String descricao) {
        this.data = data;
        this.valor = valor;
        this.descricao = descricao;
    }
}
