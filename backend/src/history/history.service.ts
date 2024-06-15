import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './repository/history.repository';
import { historyDto } from './dto';

@Injectable()
export class HistoryService {
    constructor(private readonly repository:HistoryRepository){}

    async getAll(userId:string){
        return await this.repository.findMany(userId)
    }

    async create(userId:string,data:historyDto){
        try{
            const exisitingCity = await this.repository.findCity(userId,data.city)
            if(exisitingCity){
                return exisitingCity;
            }
            const createdHistory = await this.repository.create(userId,data)
            return createdHistory
        }catch(error:any){
            throw new Error(error.message)
        }
    }

}
