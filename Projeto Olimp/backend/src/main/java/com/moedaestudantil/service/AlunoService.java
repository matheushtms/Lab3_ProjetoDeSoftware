package com.moedaestudantil.service;

import com.moedaestudantil.dto.AlunoDTO;
import com.moedaestudantil.entity.Aluno;
import com.moedaestudantil.entity.InstituicaoEnsino;
import com.moedaestudantil.repository.AlunoRepository;
import com.moedaestudantil.repository.InstituicaoEnsinoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final InstituicaoEnsinoRepository instituicaoRepository;

    public AlunoService(AlunoRepository alunoRepository, InstituicaoEnsinoRepository instituicaoRepository) {
        this.alunoRepository = alunoRepository;
        this.instituicaoRepository = instituicaoRepository;
    }

    public List<AlunoDTO> listarTodos() {
        return alunoRepository.listAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AlunoDTO buscarPorId(Long id) {
        Aluno aluno = alunoRepository.findById(id);
        if (aluno == null) {
            throw new NotFoundException("Aluno não encontrado");
        }
        return toDTO(aluno);
    }

    @Transactional
    public AlunoDTO criar(AlunoDTO dto) {
        InstituicaoEnsino instituicao = instituicaoRepository.findById(dto.instituicaoId);
        if (instituicao == null) {
            throw new NotFoundException("Instituição de ensino não encontrada");
        }

        Aluno aluno = new Aluno();
        aluno.setNome(dto.nome);
        aluno.setEmail(dto.email);
        aluno.setCpf(dto.cpf);
        aluno.setRg(dto.rg);
        aluno.setEndereco(dto.endereco);
        aluno.setCurso(dto.curso);
        aluno.setSenha(dto.senha);
        aluno.setSaldoMoedas(dto.saldoMoedas != null ? dto.saldoMoedas : 0);
        aluno.setInstituicao(instituicao);

        alunoRepository.persist(aluno);
        return toDTO(aluno);
    }

    @Transactional
    public AlunoDTO atualizar(Long id, AlunoDTO dto) {
        Aluno aluno = alunoRepository.findById(id);
        if (aluno == null) {
            throw new NotFoundException("Aluno não encontrado");
        }

        InstituicaoEnsino instituicao = instituicaoRepository.findById(dto.instituicaoId);
        if (instituicao == null) {
            throw new NotFoundException("Instituição de ensino não encontrada");
        }

        aluno.setNome(dto.nome);
        aluno.setEmail(dto.email);
        aluno.setCpf(dto.cpf);
        aluno.setRg(dto.rg);
        aluno.setEndereco(dto.endereco);
        aluno.setCurso(dto.curso);
        aluno.setSenha(dto.senha);
        aluno.setSaldoMoedas(dto.saldoMoedas != null ? dto.saldoMoedas : aluno.getSaldoMoedas());
        aluno.setInstituicao(instituicao);

        return toDTO(aluno);
    }

    @Transactional
    public void excluir(Long id) {
        boolean removido = alunoRepository.deleteById(id);
        if (!removido) {
            throw new NotFoundException("Aluno não encontrado");
        }
    }

    private AlunoDTO toDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.id = aluno.getId();
        dto.nome = aluno.getNome();
        dto.email = aluno.getEmail();
        dto.cpf = aluno.getCpf();
        dto.rg = aluno.getRg();
        dto.endereco = aluno.getEndereco();
        dto.curso = aluno.getCurso();
        dto.senha = aluno.getSenha();
        dto.saldoMoedas = aluno.getSaldoMoedas();
        dto.instituicaoId = aluno.getInstituicao() != null ? aluno.getInstituicao().getId() : null;
        return dto;
    }
}