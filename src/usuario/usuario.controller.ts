import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
    
    constructor(private usuarioRepo: UsuarioRepository){ }

    @Post()
    async criaUsuario(@Body() dadosUsuario : CriaUsuarioDTO){
        this.usuarioRepo.salvar(dadosUsuario);
        return dadosUsuario;
    }

    @Get()
    async listaUsuarios(){
        return this.usuarioRepo.listar();
    }

}