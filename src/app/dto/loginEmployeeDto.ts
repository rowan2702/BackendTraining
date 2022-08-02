import { IsNumber, IsString } from "class-validator";

export class LoginEmployeeDto {
    @IsString()
    public username: string;

    @IsString()
    public password: string;
}