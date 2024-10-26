// paginated-response.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseData, PaginatedResponse } from '../types/global'

@Injectable()
export class PaginatedResponseInterceptor<T> implements NestInterceptor<T, PaginatedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(async (data) => this.formatResponse(context, data)))
  }

  private formatResponse(
    context: ExecutionContext,
    data: any
  ): ResponseData<T | PaginatedResponse<T>> {
    if (Array.isArray(data) && !isNaN(data[1])) {
      const response = context.switchToHttp().getResponse()
      const request = context.switchToHttp().getRequest()
      const page = parseInt(request.query.page as string, 10) || 1
      const pageSize = parseInt(request.query.limit as string, 10) || 10
      const [list, total] = data

      const paginatedData: PaginatedResponse<T> = {
        data: list,
        page,
        pageSize,
        total,
        next: page < Math.ceil(total / pageSize) ? page + 1 : undefined,
        prev: page > 1 ? page - 1 : undefined,
      }

      return {
        status: 200,
        msg: 'Success',
        data: paginatedData,
      }
    }
    return {
      status: 200,
      msg: 'Success',
      data,
    }
  }
}
