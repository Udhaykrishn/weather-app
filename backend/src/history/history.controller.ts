import { Controller, Get, Param } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly service:HistoryService){

    }

    @Get(":userId")
    async getAll(@Param("userId") userId:string){
        return this.service.getAll(userId)
    }
}
