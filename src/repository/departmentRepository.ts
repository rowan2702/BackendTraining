import { DeepPartial, getConnection } from "typeorm";
import { Department } from "../app/entities/Department";

export class DepartmentRespository{
    async getAllDepartments(): Promise<Department[]> {
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }

    public async saveEmployeeDetails(departmentDetails: Department): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }

    public async updateDepartmentDetails(departmentId: string, departmentDetails: DeepPartial<Department>) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update({ id: departmentId, deletedAt: null }, departmentDetails);
        return updateDepartmentDetails;
    }

    public async softDeleteDepartmentById(id: string) {
        const employeeRepo = getConnection().getRepository(Department);
        return employeeRepo.softDelete({
            id
        });
    }
}
