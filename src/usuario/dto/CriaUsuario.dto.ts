import { IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class CriaUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    nome: string;

    @IsEmail(undefined, { message: 'O email informado é inválido!' })
    @EmailEhUnico({ message: 'Ja existe um usuario com este email.' })
    email: string;

    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres!' })
    senha: string;

}