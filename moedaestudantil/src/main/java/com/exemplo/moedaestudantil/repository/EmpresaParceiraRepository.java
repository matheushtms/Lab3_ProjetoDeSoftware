package com.exemplo.moedaestudantil.repository;

import com.exemplo.moedaestudantil.entity.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {
    Optional<EmpresaParceira> findByEmail(String email);
    Optional<EmpresaParceira> findByCnpj(String cnpj);
}