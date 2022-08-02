import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import { CreateDepartmentDto } from "../dto/createDepartment";
import validationMiddleware from "../middleware/validationMiddleware";
import { ParamDto } from "../dto/paramsDto";
import authorize from "../middleware/authorize";
import { UpdateDepartmentDto } from "../dto/updateDepartment";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(
      `${this.path}`, 
      authorize(),
      this.getDepartment);

    this.router.post(
      `${this.path}`,
      authorize(['admin']),
      validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body), 
      this.createDepartment);

    this.router.put(
      `${this.path}/:id`, 
      authorize(['admin']),
      validationMiddleware(UpdateDepartmentDto,APP_CONSTANTS.body),
      validationMiddleware(ParamDto,APP_CONSTANTS.params),
      this.updateDepartment);

    this.router.delete(
      `${this.path}/:id`, 
      authorize(['admin']),
      validationMiddleware(ParamDto,APP_CONSTANTS.params),
      this.deleteDepartment);

  }
  private getDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.departmentService.updateDepartment(id, request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = request.params;
      const data = await this.departmentService.deleteDepartment(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  
}

export default DepartmentController;
