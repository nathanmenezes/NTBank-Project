package br.com.nt.ntbank.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class TransferenciaDTO {
    @NotBlank(message = "Preenchimento do valor é obrigatório!")
    private double valor;

    @NotBlank(message = "Preenchimento do id é obrigatório!")
    private long id;
}
