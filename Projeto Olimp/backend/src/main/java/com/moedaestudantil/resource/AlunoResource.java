package com.moedaestudantil.resource;

import com.moedaestudantil.dto.AlunoDTO;
import com.moedaestudantil.service.AlunoService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.util.List;

@Path("/alunos")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoResource {

    @Inject
    AlunoService alunoService;

    @GET
    public List<AlunoDTO> listarTodos() {
        return alunoService.listarTodos();
    }

    @GET
    @Path("/{id}")
    public AlunoDTO buscarPorId(@PathParam("id") Long id) {
        return alunoService.buscarPorId(id);
    }

    @POST
    public Response criar(AlunoDTO dto) {
        AlunoDTO criado = alunoService.criar(dto);
        return Response.created(URI.create("/alunos/" + criado.id)).entity(criado).build();
    }

    @PUT
    @Path("/{id}")
    public AlunoDTO atualizar(@PathParam("id") Long id, AlunoDTO dto) {
        return alunoService.atualizar(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public Response excluir(@PathParam("id") Long id) {
        alunoService.excluir(id);
        return Response.noContent().build();
    }
}