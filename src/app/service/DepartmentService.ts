import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { DepartmentRespository } from "../repository/departmentRepository";
import { CreateDepartmentDto } from "../dto/createDepartment";
import { UpdateDepartmentDto } from "../dto/updateDepartment";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import RequestWithUser from "../util/rest/request";

export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository){

    }

    async getAllDepartments(): Promise<Department[]>{
        return await this.departmentRepo.getAllDepartments();
    }

    async updateDepartment(id: string, departmentDetails: UpdateDepartmentDto){
        return await this.departmentRepo.updateDepartmentDetails(id, departmentDetails);
    }

    public async createDepartment(departmentDetails: CreateDepartmentDto) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
                
            });
            const save = await this.departmentRepo.saveEmployeeDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee","");
        }
    }

    async deleteDepartment(id: string){
        return await this.departmentRepo.softDeleteDepartmentById(id);
    }
}    