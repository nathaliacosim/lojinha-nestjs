import { IsEmail, MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'O email informado é inválido!' })
    @EmailEhUnico({ message: 'Ja existe um usuario com este email.' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres!' })
    @IsOptional()
    senha: string;
}