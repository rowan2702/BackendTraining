import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public status: string;

    @IsString()
    public joiningDate: string;

    @IsString()
    public role: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public departmentId: string;
}