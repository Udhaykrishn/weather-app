import { Injectable } from "@nestjs/common";
import { Prisma,History } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class HistoryRepository{
    constructor(private readonly prisma:PrismaService){}

    async findMany(userId:string):Promise<History[]>{
        try {
            return this.prisma.history.findMany({
                where:{userId}
            })
        } catch (error:any) {
            throw new Error(error.messgae)
        }
    }

    async create(userId:string,data:Omit<Prisma.HistoryCreateInput,"user">):Promise<History>{
        return await this.prisma.history.create({
            data:{
                ...data,
                user:{connect:{userId}}
            }
        })
    }

    async findCity(userId:string,city:string):Promise<History>{
        return this.prisma.history.findFirst({
            where:{
                userId:userId,
                city,
            }
        })
    }
}