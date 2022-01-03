import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtWrapperService } from './services/jwt-wrapper.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [JwtWrapperService, JwtAuthGuard],
  exports: [JwtWrapperService, JwtAuthGuard],
})
export class AuthModule {}
