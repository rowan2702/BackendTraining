import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { DepartmentRespository } from "../../repository/departmentRepository";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import RequestWithUser from "../util/rest/request";

export class DepartmentService{
    constructor(private departmentRepo: DepartmentRespository){

    }

    async getAllDepartments(){
        return await this.departmentRepo.getAllDepartments();
    }

    async updateDepartment(id: string, employeeDetails: any){
        return await this.departmentRepo.updateDepartmentDetails(id, employeeDetails);
    }

    public async createDepartment(departmentDetails: any) {
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