package com.exemplo.moedaestudantil.controller;

import com.exemplo.moedaestudantil.dto.EmpresaParceiraRequestDTO;
import com.exemplo.moedaestudantil.entity.EmpresaParceira;
import com.exemplo.moedaestudantil.service.EmpresaParceiraService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaParceiraController {

    private final EmpresaParceiraService empresaParceiraService;

    public EmpresaParceiraController(EmpresaParceiraService empresaParceiraService) {
        this.empresaParceiraService = empresaParceiraService;
    }

    @PostMapping
    public ResponseEntity<EmpresaParceira> criar(@RequestBody EmpresaParceiraRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(empresaParceiraService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<EmpresaParceira>> listar() {
        return ResponseEntity.ok(empresaParceiraService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceira> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(empresaParceiraService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceira> atualizar(
            @PathVariable Long id,
            @RequestBody EmpresaParceiraRequestDTO dto) {

        return ResponseEntity.ok(
                empresaParceiraService.atualizar(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        empresaParceiraService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}