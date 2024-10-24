import { InjectRepository } from '@nestjs/typeorm';
import { CONNECT_SHARES } from './dbUtils';

export const SharesInjectRepository = <T>(entity: new (...args: any[]) => T) => {
  return InjectRepository(entity, CONNECT_SHARES)
}
