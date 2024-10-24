import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Entities, ShareEntities } from '@/entities';
import { MysqlConf, MongoConf, RedisConf } from 'conf/db.conf'
import {
  CONNECT_BLOG,
  CONNECT_MONGO,
  CONNECT_SHARES,
  setDataSource,
  setMongoDataSource,
  // setRedisSource,
} from './dbUtils';

const connectOptions = [
  {
    // name: 'default', // must need 'default'
    entities: Entities,
    database: CONNECT_BLOG
  },
  {
    name: CONNECT_SHARES,
    entities: ShareEntities,
    database: CONNECT_SHARES
  },
]

export const DBModules = connectOptions.map(i => {
  return TypeOrmModule.forRoot({
    ...i,
    type     : 'mysql',
    host     : 'localhost',
    port     : MysqlConf.port,
    username : MysqlConf.username,
    password : MysqlConf.password,
    database : i.database,
    entities : Entities,
  })
})

