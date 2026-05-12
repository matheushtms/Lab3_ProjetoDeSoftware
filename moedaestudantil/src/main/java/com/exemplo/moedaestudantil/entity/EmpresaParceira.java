package com.exemplo.moedaestudantil.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "empresa_parceira",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_empresa_email", columnNames = "email"),
        @UniqueConstraint(name = "uk_empresa_cnpj", columnNames = "cnpj")
    }
)
public class EmpresaParceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 18)
    private String cnpj;

    @Column(length = 200)
    private String descricao;

    @Column(nullable = false)
    private Boolean ativo = true;

    public EmpresaParceira() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}