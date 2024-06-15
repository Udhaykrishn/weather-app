import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { historyDto } from './dto';

@Controller('history')
export class HistoryController {
    constructor(private readonly service:HistoryService){

    }

    @Get(":userId")
    async getAll(@Param("userId") userId:string){
        return this.service.getAll(userId)
    }

    @Post(":userId")
    async create(@Param("userId")userId:string,@Body() data:historyDto){
        return this.service.create(userId,data)
    }
}
