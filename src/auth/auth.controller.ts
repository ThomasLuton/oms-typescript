import { Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.NO_CONTENT)
    async register(@Body() input: RegisterDto) {
        await this.authService.register(input);
    }
}
