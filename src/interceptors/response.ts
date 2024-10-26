// response.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => this.formatResponse(data)),
    );
  }

  private formatResponse(data: any) {
    if(Array.isArray(data) && !isNaN(data[1])) {
      return {
        status: 200,
        msg: 'Success',
        data: {
          list: data[0],
          total: data[1]
        }
      }
    }
    return {
      status: 200,
      msg: 'Success',
      data,
    };
  }
}