package com.moedaestudantil.repository;

import com.moedaestudantil.entity.InstituicaoEnsino;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class InstituicaoEnsinoRepository implements PanacheRepository<InstituicaoEnsino> {
}