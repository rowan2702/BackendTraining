import { DeepPartial, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(): Promise<Employee[]> {
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations: ['department','address']});
    }

    async getEmployeeById(id: string, relations?: string[]): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id, {relations: relations});
    }

    public async saveEmployeeDetails(employeeDetails: Employee): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async softDeleteEmployeeById(id: string): Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        const employee = await this.getEmployeeById(id, ["address"]);
        return employeeRepo.softRemove(employee);
    }

    public async updateEmployeeDetails(employeeId: string, employeeDetails: DeepPartial<Employee>) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username : username },
        });
        return employeeDetail;
    }
}
