import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    
    constructor(private usuarioRepo: UsuarioRepository){ }

    @Post()
    async criaUsuario(@Body() dadosUsuario : CriaUsuarioDTO){
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.senha = dadosUsuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepo.salvar(usuarioEntity);
        return { 
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuário criado com sucesso!' 
        };
    }

    @Get()
    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepo.listar();
        const usuariosLista = usuariosSalvos.map(usuario =>
            new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );

        return usuariosLista;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados : AtualizaUsuarioDTO){
        const usuarioAtualizado = await this.usuarioRepo.atualizar(id, novosDados);

        return {
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado com sucesso!'
        }
    }


    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioRepo.remover(id);

        return {
            usuario: usuarioRemovido,
            message: 'Usuário removido com sucesso!'
        };
    }
}