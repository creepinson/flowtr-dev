import {
    JsonController,
    Post,
    BodyParam,
    UnauthorizedError,
} from 'routing-controllers'
import { EntityFromBody } from 'typeorm-routing-controllers-extensions'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getConnection } from 'typeorm'
import { UserRepository } from '../service/users'

@JsonController('/api/auth')
export class AuthController {
    constructor(private readonly users: UserRepository) {}

    @Post('/signup')
    async signUp(@EntityFromBody() user: User) {
        const password = user.password
        const passwordHashed = this.hashPassword(password)
        user.password = passwordHashed

        const savedUser = await this.users.create(user)

        const token = this.generateJwt(savedUser)

        return {
            user: {
                userId: savedUser.id,
                username: savedUser.username,
                role: savedUser.role,
            },
            token,
        }
    }

    hashPassword(password: string) {
        password = bcrypt.hashSync(password, 12)

        return password
    }

    generateJwt(user: User) {
        return jwt.sign(
            {
                data: {
                    userId: user.id,
                    username: user.username,
                    role: user.role,
                },
            },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        )
    }

    @Post('/signin')
    async signIn(
        @BodyParam('username') username: string,
        @BodyParam('password') password: string
    ) {
        //Get user from database
        let user: User
        try {
            user = await this.users.getWithPassword(username)
        } catch (error) {
            throw new UnauthorizedError('Username incorrect')
        }

        //Check if encrypted password match
        if (!this.isPasswordCorrect(password, user.password)) {
            throw new UnauthorizedError('Password Incorrect')
        }

        //Sing JWT, valid for 1 hour
        const token = this.generateJwt(user)

        return {
            user: {
                userId: user.id,
                username: user.username,
                role: user.role,
            },
            token,
        }
    }

    isPasswordCorrect(password: string, savedPassword: string): boolean {
        if (bcrypt.compareSync(password, savedPassword)) return true
        else return false
    }
}
