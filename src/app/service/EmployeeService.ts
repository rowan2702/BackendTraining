import { plainToClass } from "class-transformer";
import { NextFunction } from "express";
import { stringify } from "querystring";
import { getConnection } from "typeorm";
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

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository){

    }

    async getAllEmployees(){
        return await this.employeeRepo.getAllEmployees();
    }

    async deleteEmployee(id: string){
        return await this.employeeRepo.softDeleteEmployeeById(id);
    }

    async getEmployeeId(id: string){
        const employee = await this.employeeRepo.getEmployeeId(id);
        if(!employee) {
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
        }
        return 
    }

    async updateEmployee(id: string, employeeDetails: any){
        return await this.employeeRepo.updateEmployeeDetails(id, employeeDetails);
    }

    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                joiningDate: employeeDetails.joiningDate,
                role: employeeDetails.role,
                status: employeeDetails.status,
                username: employeeDetails.username,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
                departmentId: employeeDetails.departmentId,
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