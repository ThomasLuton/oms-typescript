import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
