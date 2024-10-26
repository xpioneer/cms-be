import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './response'
import { PaginatedResponseInterceptor } from './response1'

export const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: PaginatedResponseInterceptor,
  },
]
