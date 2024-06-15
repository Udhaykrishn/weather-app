import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from './history/history.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:".env"
  }),UserModule, PrismaModule, HistoryModule],
  controllers: [AppController],
})
export class AppModule {}
