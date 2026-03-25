import { ConflictException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { UsersRepository } from "src/users/users.repository";


@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async register(input: RegisterDto) {
        const existingUser = await this.usersRepository.findByEmail(input.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        console.log('Registering user with email:', input.email);
        console.log('Hashed password:', hashedPassword);

        const user = await this.usersRepository.create({
            email: input.email,
            password: hashedPassword
        });

        const { password, ...result } = user;
        return result;
    }
}
