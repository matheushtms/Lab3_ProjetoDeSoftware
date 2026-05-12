package com.exemplo.moedaestudantil.service;

import com.exemplo.moedaestudantil.repository.EmpresaParceiraRepository;
import com.exemplo.moedaestudantil.dto.EmpresaParceiraRequestDTO;
import com.exemplo.moedaestudantil.entity.EmpresaParceira;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmpresaParceiraService {

    private final EmpresaParceiraRepository empresaParceiraRepository;

    public EmpresaParceiraService(EmpresaParceiraRepository empresaParceiraRepository) {
        this.empresaParceiraRepository = empresaParceiraRepository;
    }

    @Transactional
    public EmpresaParceira criar(EmpresaParceiraRequestDTO dto) {
        if (empresaParceiraRepository.findByEmail(dto.email).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado.");
        }
        if (empresaParceiraRepository.findByCnpj(dto.cnpj).isPresent()) {
            throw new IllegalArgumentException("CNPJ já cadastrado.");
        }

        EmpresaParceira empresa = new EmpresaParceira();
        empresa.setNome(dto.nome);
        empresa.setEmail(dto.email);
        empresa.setCnpj(dto.cnpj);
        empresa.setDescricao(dto.descricao);
        empresa.setAtivo(true);

        return empresaParceiraRepository.save(empresa);
    }

    public List<EmpresaParceira> listar() {
        return empresaParceiraRepository.findAll();
    }

    public EmpresaParceira buscarPorId(Long id) {
        return empresaParceiraRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada."));
    }

    @Transactional
    public EmpresaParceira atualizar(Long id, EmpresaParceiraRequestDTO dto) {
        EmpresaParceira empresa = buscarPorId(id);
        empresa.setNome(dto.nome);
        empresa.setEmail(dto.email);
        empresa.setCnpj(dto.cnpj);
        empresa.setDescricao(dto.descricao);
        return empresaParceiraRepository.save(empresa);
    }

    @Transactional
    public void excluir(Long id) {
        if (!empresaParceiraRepository.existsById(id)) {
            throw new IllegalArgumentException("Empresa não encontrada.");
        }
        empresaParceiraRepository.deleteById(id);
    }
}