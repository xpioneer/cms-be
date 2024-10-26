// response.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ResponsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return {
      code: 'SUCCESS',
      message: '操作成功',
      data: value,
    };
  }
}