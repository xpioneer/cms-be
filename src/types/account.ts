import { User } from '@/entities/user'

export type UserLogin = Pick<User, 'username' | 'password'>
