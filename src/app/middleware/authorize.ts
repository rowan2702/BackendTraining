import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";


const authorize = (permittedRoles?: string[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
    //   const token = getTokenFromRequestHeader(req);
    //   jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
    //   const data = jsonwebtoken.decode(token);
    //   const det = JSON.parse(JSON.stringify(data));

      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);

      const data = jsonwebtoken.decode(token);

      const decodedData = JSON.parse(JSON.stringify(data));

      if ((typeof permittedRoles !== 'undefined') && (!(permittedRoles.includes(decodedData.role)))) {
        throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
      }
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED));
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;