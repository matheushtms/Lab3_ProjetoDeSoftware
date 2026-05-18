package com.moedaestudantil.resource;

import com.moedaestudantil.dto.AlunoDTO;
import com.moedaestudantil.service.AlunoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/alunos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoResource {

    @Inject
    private AlunoService alunoService;

    /**
     * Obtém a lista de todos os alunos cadastrados.
     * GET /api/alunos
     */
    @GET
    public Response listar() {
        List<AlunoDTO> alunos = alunoService.listarTodos();
        return Response.ok(alunos).build();
    }

    /**
     * Obtém um aluno específico pelo ID.
     * GET /api/alunos/{id}
     */
    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        AlunoDTO aluno = alunoService.buscarPorId(id);
        return Response.ok(aluno).build();
    }

    /**
     * Cadastra um novo aluno no sistema.
     * POST /api/alunos
     */
    @POST
    public Response criar(AlunoDTO dto) {
        AlunoDTO novoAluno = alunoService.criar(dto);
        return Response.status(Response.Status.CREATED).entity(novoAluno).build();
    }

    /**
     * Atualiza um aluno existente.
     * PUT /api/alunos/{id}
     */
    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") Long id, AlunoDTO dto) {
        AlunoDTO alunoAtualizado = alunoService.atualizar(id, dto);
        return Response.ok(alunoAtualizado).build();
    }

    /**
     * Deleta um aluno.
     * DELETE /api/alunos/{id}
     */
    @DELETE
    @Path("/{id}")
    public Response excluir(@PathParam("id") Long id) {
        alunoService.excluir(id);
        return Response.noContent().build();
    }
}