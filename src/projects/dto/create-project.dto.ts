import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty({ message: 'Поле не должно быть пустым' })
    title: string;

    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    description?: string;
}
