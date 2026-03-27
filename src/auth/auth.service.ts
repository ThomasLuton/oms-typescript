import { ConflictException, UnauthorizedException, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto, UserRegistered } from "./auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from "src/users/users.repository";
import { EventEmitter2 } from "@nestjs/event-emitter";


@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async register(input: RegisterDto) {
        const existingUser = await this.usersRepository.findByEmail(input.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(input.password, 12);

        const user = await this.usersRepository.create({
            email: input.email,
            password: hashedPassword
        });

        const { password, ...result } = user;
        this.eventEmitter.emit('user.registered', {
            id: user.id,
            email: user.email,
            createdAt: Date.now()
        } as UserRegistered)
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

        return { access_token: token };
    }
}
