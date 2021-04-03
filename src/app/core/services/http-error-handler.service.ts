import { ErrorHandler, Injectable } from "@angular/core";

import { HttpErrorResponse } from "@angular/common/http";
import { HttpStatus } from "../models/http-status.enum";
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class HttpErrorHandlerService implements ErrorHandler {

  constructor(private log: LoggingService) {
  }

  handleError(error: Error | HttpErrorResponse) {
    let errorMessage: string = "";

    if (!(error instanceof HttpErrorResponse)) {
      errorMessage = error.message ? error.message : error.toString();
      this.log.error(errorMessage);
      return;
    }

    switch (error.status) {
      case HttpStatus.NoConnection: break;
      case HttpStatus.Ok: break;
      case HttpStatus.Created: break;
      case HttpStatus.BadRequest: break;
      case HttpStatus.Unauthorized: break;
      case HttpStatus.Forbidden: break;
      case HttpStatus.NotFound: break;
      case HttpStatus.NotAllowed: break;
      case HttpStatus.Conflict: break;
      case HttpStatus.InternalServerError: break;
      
      default: break;
    }
  }
}
