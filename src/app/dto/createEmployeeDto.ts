import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { EmployeeAddressDto } from "./employeeAddressDto";

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

    @ValidateNested({ each: true })
    @Type(() => EmployeeAddressDto)
    public address: EmployeeAddressDto;
}