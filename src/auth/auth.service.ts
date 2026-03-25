import { ConflictException, UnauthorizedException, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from "src/users/users.repository";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

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

    async login(input: LoginDto) {
        const user = await this.usersRepository.findByEmail(input.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { acces_token: token };
    }
}
