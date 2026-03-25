import { Controller, HttpCode, HttpStatus, Post, Body, Get, UseGuards, Request } from "@nestjs/common";
import { RegisterDto, LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./auth.guard";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.NO_CONTENT)
    async register(@Body() input: RegisterDto) {
        await this.authService.register(input);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() input: LoginDto) {
        return this.authService.login(input);
    }

    @Get('me')
    @UseGuards(JwtGuard)
    me(@Request() req) {
        return req.user;
    }
}
