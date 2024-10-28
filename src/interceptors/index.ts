import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './response'

export const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
]
