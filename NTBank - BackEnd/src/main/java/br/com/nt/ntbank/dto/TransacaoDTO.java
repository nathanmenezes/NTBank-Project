package br.com.nt.ntbank.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;


@Data
public class TransacaoDTO {
    @NotBlank(message = "Preenchimento do valor é obrigatório!")
    private double valor;
}
