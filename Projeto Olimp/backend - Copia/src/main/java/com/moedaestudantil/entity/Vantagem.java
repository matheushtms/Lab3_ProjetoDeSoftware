package com.moedaestudantil.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vantagem")
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, length = 1000)
    private String descricao;

    private String fotoUrl;

    @Column(nullable = false)
    private Integer custoMoedas;

    private String status;

    @ManyToOne
    @JoinColumn(name = "empresa_parceira_id", nullable = false)
    private EmpresaParceira empresaParceira;

    @OneToMany(mappedBy = "vantagem")
    private List<TransacaoMoeda> transacoes = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public Integer getCustoMoedas() {
        return custoMoedas;
    }

    public void setCustoMoedas(Integer custoMoedas) {
        this.custoMoedas = custoMoedas;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public EmpresaParceira getEmpresaParceira() {
        return empresaParceira;
    }

    public void setEmpresaParceira(EmpresaParceira empresaParceira) {
        this.empresaParceira = empresaParceira;
    }

    public List<TransacaoMoeda> getTransacoes() {
        return transacoes;
    }
}