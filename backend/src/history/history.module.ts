import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistoryRepository } from './repository/history.repository';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService,HistoryRepository]
})
export class HistoryModule {}
