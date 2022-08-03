import { IsNumber, IsOptional, IsString } from "class-validator";

export class EmployeeAddressDto {
    @IsOptional()
    @IsString()
    public line1: string;

    @IsOptional()
    @IsString()
    public line2: string;

    @IsOptional()
    @IsString()
    public city: string;

    @IsOptional()
    @IsString()
    public state: string;

    @IsOptional()
    @IsString()
    public country: string;

    @IsOptional()
    @IsString()
    public pincode: string;
}