import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { stringify } from "querystring";
import { DeepPartial, getConnection } from "typeorm";
import { EmployeeRespository } from "../../repository/employeeRepository";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { ErrorCodes } from "../util/errorCode";
import RequestWithUser from "../util/rest/request";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository){

    }

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepo.getAllEmployees();
    }

    async deleteEmployee(id: string): Promise<Employee> {
        return await this.employeeRepo.softDeleteEmployeeById(id);
    }

    async getEmployeeId(id: string){
        const employee = await this.employeeRepo.getEmployeeById(id);
        if(!employee) {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        return 
    }

    async updateEmployee(id: string, employeeDetails: DeepPartial<UpdateEmployeeDto>){
      const employee = await this.employeeRepo.getEmployeeById(id, ["address"]);

      employee.address.line1 = employeeDetails.address.line1 ? employeeDetails.address.line1 : employee.address.line1;
      employee.address.line2 = employeeDetails.address.line2 ? employeeDetails.address.line2 : employee.address.line2;  
      employee.address.city = employeeDetails.address.city ? employeeDetails.address.city : employee.address.city;
      employee.address.state = employeeDetails.address.state ? employeeDetails.address.state : employee.address.state;
      employee.address.country = employeeDetails.address.country ? employeeDetails.address.country : employee.address.country;
      employee.address.pincode = employeeDetails.address.pincode ? employeeDetails.address.pincode : employee.address.pincode;

      
      return await this.employeeRepo.updateEmployeeDetails(id, employee);
    }

    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                joiningDate: employeeDetails.joiningDate,
                role: employeeDetails.role,
                status: employeeDetails.status,
                username: employeeDetails.username,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                departmentId: employeeDetails.departmentId,
                address: employeeDetails.address,
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw err;
        }
    }

    public employeeLogin = async (
        username: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
          username
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role": employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      }; 

}    