import { IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {

    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    title?: string;

    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    description?: string;
}
