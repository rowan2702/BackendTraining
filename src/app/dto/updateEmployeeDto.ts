import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public status?: string;

    @IsOptional()
    @IsString()
    public joiningDate?: string;

    @IsOptional()
    @IsString()
    public role?: string;

    @IsOptional()
    @IsString()
    public departmentId: string;
}