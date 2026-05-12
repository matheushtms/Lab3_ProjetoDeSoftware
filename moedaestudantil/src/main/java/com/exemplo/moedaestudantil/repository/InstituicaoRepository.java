package com.exemplo.moedaestudantil.repository;

import com.exemplo.moedaestudantil.entity.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
}