// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import {
	connectDB,
	// connectMongo,
	// connectRedis,
} from './database/conectDB'
import { DBModules } from './database/modules';
import { controllers } from './controllers'
import { daos } from './daos'
import { Entities } from './entities'


@Module({
  imports: [
    ...DBModules,
    TypeOrmModule.forFeature(Entities)
  ],
  controllers,
  providers: [
    ...daos
  ],
})
export class AppModule {
  constructor(){
    // this.connectDBs().catch(e => {
		// 	console.error('Server setup failed!', e)
		// })
  }


	private connectDBs() {
		return Promise.all([
      connectDB(),
      // connectMongo(),
      // connectRedis(),
    ]).then(r => {
			console.log('All databases are connected.')
		})
	}
}