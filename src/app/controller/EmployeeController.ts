import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
import { ParamDto } from "../dto/paramsDto";
import authorize from "../middleware/authorize";
import { LoginEmployeeDto } from "../dto/loginEmployeeDto";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authorize(['admin']),
      this.getEmployee);
    
    this.router.get(
      `${this.path}/:id`,
      authorize(['admin']),
      validationMiddleware(ParamDto,APP_CONSTANTS.params),
      this.getEmployeeId);

    this.router.post(
      `${this.path}`,
      authorize(['admin']),
      validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body), 
      this.createEmployee);

    this.router.put(
      `${this.path}/:id`,
      authorize(),
      validationMiddleware(UpdateEmployeeDto,APP_CONSTANTS.body),
      validationMiddleware(ParamDto,APP_CONSTANTS.params),
      this.updateEmployee);

    this.router.delete(
      `${this.path}/:id`,
      authorize(['admin']),
      validationMiddleware(ParamDto,APP_CONSTANTS.params), 
      this.deleteEmployee);

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginEmployeeDto,APP_CONSTANTS.body),
      this.login
    );
  }

  private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.employeeService.updateEmployee(id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private getEmployeeId = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = request.params;
      const data = await this.employeeService.getEmployeeId(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = request.params;
      const data = await this.employeeService.deleteEmployee(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
    } catch(err) {
      next(err);
    }

    
  };

  
}

export default EmployeeController;
