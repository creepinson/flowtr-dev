import { Service } from 'typedi'
import { Connection } from 'typeorm'
import { InjectConnection } from 'typeorm-typedi-extensions'
import { User } from '../entity/User'

@Service()
export class UserRepository {
    constructor(@InjectConnection() private connection: Connection) {}
    async create(user: User): Promise<User> {
        return this.connection.manager.create(User, user)
    }

    async getWithPassword(username: string): Promise<User> {
      const found = await this.connection.manager.find(User, { username })
      return found.find(u => username === username)
    }
}
