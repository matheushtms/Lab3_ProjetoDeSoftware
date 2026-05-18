package com.moedaestudantil.resource;

import com.moedaestudantil.dto.AlunoDTO;
import com.moedaestudantil.service.AlunoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    private AlunoService alunoService;

    /**
     * Registra um novo aluno no sistema.
     * POST /api/auth/register
     */
    @POST
    @Path("/register")
    public Response register(AlunoDTO dto) {
        try {
            AlunoDTO novoAluno = alunoService.criar(dto);
            return Response.status(Response.Status.CREATED).entity(novoAluno).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Erro ao registrar: " + e.getMessage()).build();
        }
    }
}
