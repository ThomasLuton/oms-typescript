import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class OrderDto {
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @Min(0)
    prix: number;
}