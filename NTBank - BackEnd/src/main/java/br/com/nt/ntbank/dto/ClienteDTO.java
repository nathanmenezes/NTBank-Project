package br.com.nt.ntbank.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteDTO {
    
    @NotBlank(message = "Preencha o nome!")
    private String nome;

    @NotBlank(message = "Preencha o cpf!")
    private String cpf;

    @NotBlank(message = "Preencha a data de nascimento!")
    private String dataNascimento;

    @NotBlank(message = "Preencha o email!")
    @Email
    private String email;

    @NotBlank(message = "Preencha a senha!")
    private String senha;
}
