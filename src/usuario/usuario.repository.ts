import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios : UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listar() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(usuario => usuario.email === email);

        return possivelUsuario != undefined;
    }

    private buscaPorId(id: string){
        const possivelUsuario = this.usuarios.find(usuario => usuario.id === id);

        if(!possivelUsuario){
            throw new Error('Usuário não encontrado.');
        }

        return possivelUsuario;
    }

    async atualizar(id: string, novosDados: Partial<UsuarioEntity>){
        const usuario = this.buscaPorId(id);

        Object.entries(novosDados).forEach(([k, v]) => {
            if(k === 'id'){ 
                return;
            } 

            usuario[k] = v;
        });
        
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };
    }

    async remover(id: string){
        const usuario = this.buscaPorId(id);

        this.usuarios = this.usuarios.filter(usuarioSalvo =>
            usuarioSalvo.id !== id
        );

        return usuario;
    }
}