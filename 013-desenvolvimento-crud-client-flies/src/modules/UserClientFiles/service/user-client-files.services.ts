import fs from 'node:fs';
import path from 'node:path';
import moment from "moment";
import { prismaConnect } from "prisma.conn";

//enum
import { EStatusErrors } from "enum/status-errors.enum";
import { UtilsFileUsers } from 'utils/files-utils';
import { object } from 'zod';

class UserClientFileService {
    public async create(
        paramsId: string,
        tokenUserId: string,
        name: string,
        date: Date,
        description: string,
        file: string
    ) {
        const findUser = await prismaConnect.userClient.findUnique({
            where: {
                id: paramsId
            },

        })
        
        if(!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        const create = await prismaConnect.userClientFiles.create({
            data: {
                name,
                date,
                file,
                description,
                userId: tokenUserId,
                userClientId: paramsId
            }
        });

        return create;
    }

    public async read(paramsId: string, tokenUserId: string) {
        const findUserClient = prismaConnect.userClientFiles.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId
            },
            include: {
                userClient: {}
            }
        });

        if(!findUserClient){
            throw new Error(EStatusErrors.E404);
        }

        return findUserClient;
    }

    public async listAll(
        paramsId: string, 
        paramsYear: string, 
        tokenUserId: string
    ) {
        const startDate = moment(`${paramsYear}`).startOf('year').format();
        const endDate = moment(`${paramsYear}`).endOf('year').format();

        const findAll = await prismaConnect.userClientFiles.findMany({
            where: {
                userClientId: paramsId,
                userId: tokenUserId,
                date: {
                    gt: startDate,
                    lt: endDate
                }
            }
        });

        if(!findAll) {
            throw new Error(EStatusErrors.E404);
        }

        const monthRecords: Array<number> = [];
        const monthCounts: any = {};

        findAll.forEach((record) => {
            const month = record.date.getMonth();
            monthRecords.push(month);
        });

        monthRecords.find((month) => {
            if(monthCounts[month]){
                return monthCounts[month]++;
            }

            return (monthCounts[month] = 1);
        });

        const count = Object.entries(monthCounts).map(([month, total]) => {
            return {
                month: Number(month) + 1,
                total
            }
        })

        return { count, results: findAll };
    }

    public async update(
        paramsId: string,
        tokenUserId: string,
        id: string,
        name: string,
        date: Date,
        description: string,
        file: string
    ) {
        const find = await prismaConnect.userClientFiles.findFirst({
            where: {
                id,
                userClientId: paramsId,
                userId: tokenUserId
            }
        });

        if(!find) {
            throw new Error(EStatusErrors.E404)
        }

        const update = await prismaConnect.userClientFiles.update({
            where: {
                id,
                userClientId: paramsId,
                userId: tokenUserId
            },
            data: {
                name,
                date,
                description,
                file
            }
        });

        const fileUrl = ['assets', 'files', tokenUserId, paramsId];
        if(fs.existsSync(path.resolve(...fileUrl))){
            fs.rmSync(path.resolve(...fileUrl, find.file));
        }

        return update;
    }

    public async delete(paramsId: string, tokenUserId: string) {
        const find = await prismaConnect.userClientFiles.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId
            }
        });

        if(!find) {
            throw new Error(EStatusErrors.E404);
        }

        const deleteUserClienteFile = await prismaConnect.userClientFiles.delete({
            where: {
                id: paramsId,
                userId: tokenUserId
            }
        });

        UtilsFileUsers.deleteFolderUser([
            deleteUserClienteFile.userId,
            deleteUserClienteFile.userClientId,
            deleteUserClienteFile.file
        ]);
        return deleteUserClienteFile;
    }

}

export const userClientFileService = new UserClientFileService();