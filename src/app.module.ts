// src/app.module.ts
import { Module } from '@nestjs/common';
import {
	connectDB,
	// connectMongo,
	// connectRedis,
} from './database/conectDB'
import { HelloController } from './hello.controller'
import { AccountController } from './controllers/AccountController'

@Module({
  imports: [],
  controllers: [
    HelloController,
    AccountController,
  ],
  providers: [],
})
export class AppModule {
  constructor(){
    this.connectDBs().catch(e => {
			console.error('Server setup failed!', e)
		})
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