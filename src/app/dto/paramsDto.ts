import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ParamDto {
    
    @IsUUID()
    public id: string;

}