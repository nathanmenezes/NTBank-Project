package br.com.nt.ntbank.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginDTO {
    @NotBlank(message = "Preenchimento do email é obrigatório!")
    private String email;
    @NotBlank(message = "Preenchimento da senha é obrigatório!")
    private String senha;
}
