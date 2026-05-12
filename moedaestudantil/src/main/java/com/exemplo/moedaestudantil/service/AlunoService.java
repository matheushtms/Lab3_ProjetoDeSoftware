package com.exemplo.moedaestudantil.service;

import com.exemplo.moedaestudantil.dto.AlunoRequestDTO;
import com.exemplo.moedaestudantil.entity.Aluno;
import com.exemplo.moedaestudantil.entity.Instituicao;
import com.exemplo.moedaestudantil.repository.AlunoRepository;
import com.exemplo.moedaestudantil.repository.InstituicaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final InstituicaoRepository instituicaoRepository;

    public AlunoService(AlunoRepository alunoRepository, InstituicaoRepository instituicaoRepository) {
        this.alunoRepository = alunoRepository;
        this.instituicaoRepository = instituicaoRepository;
    }

    @Transactional
    public Aluno criar(AlunoRequestDTO dto) {
        Instituicao instituicao = instituicaoRepository.findById(dto.instituicaoId)
                .orElseThrow(() -> new IllegalArgumentException("Instituição não encontrada."));

        Aluno aluno = new Aluno();
        aluno.setNome(dto.nome);
        aluno.setEmail(dto.email);
        aluno.setCpf(dto.cpf);
        aluno.setRg(dto.rg);
        aluno.setEndereco(dto.endereco);
        aluno.setCurso(dto.curso);
        aluno.setInstituicao(instituicao);
        aluno.setSaldoMoedas(0);
        aluno.setAtivo(true);

        return alunoRepository.save(aluno);
    }

    public List<Aluno> listar() {
        return alunoRepository.findAll();
    }

    public Aluno buscarPorId(Long id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado."));
    }

    @Transactional
    public Aluno atualizar(Long id, AlunoRequestDTO dto) {
        Aluno aluno = buscarPorId(id);

        Instituicao instituicao = instituicaoRepository.findById(dto.instituicaoId)
                .orElseThrow(() -> new IllegalArgumentException("Instituição não encontrada."));

        aluno.setNome(dto.nome);
        aluno.setEmail(dto.email);
        aluno.setCpf(dto.cpf);
        aluno.setRg(dto.rg);
        aluno.setEndereco(dto.endereco);
        aluno.setCurso(dto.curso);
        aluno.setInstituicao(instituicao);

        return alunoRepository.save(aluno);
    }

    @Transactional
    public void excluir(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new IllegalArgumentException("Aluno não encontrado.");
        }
        alunoRepository.deleteById(id);
    }
}