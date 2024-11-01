import { prismaConnect } from "prisma.conn";

//enum
import { EStatusErrors } from "enum/status-errors.enum";

//utils
import { UtilsFileUsers } from "utils/files-utils";

class UserClientService {
    public async create(
        tokenUserId: string,
        name: string,
        email: string,
        phone: string
    ) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: tokenUserId
            }
        });

        if(!findUser){
            throw new Error(EStatusErrors.E404);
        }

        const create = await prismaConnect.userClient.create({
            data: {
                name,
                email,
                phone,
                userId: tokenUserId
            }
        });

        UtilsFileUsers.createFolderUser([create.userId, create.id])

        return create;
    }
    
     public async read(paramsId: string, tokenUserId: string) {
        const findUserClient = await prismaConnect.userClient.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId
            }
        });

        if (!findUserClient) {
            throw new Error(EStatusErrors.E404);
        }

        return findUserClient;
     }
    
     public async listAll(tokenUserId:string, page: number, search: string | undefined) {
        const pageSize = 11;
        const skip = (page - 1) * pageSize;
        let findUser;
        
        if(!search) {
            findUser = await prismaConnect.user.findMany({
                where: {
                    id: tokenUserId,
                },
    
                include: {
                    userClient: {
                        skip,
                        take: pageSize
                    }
                }
            });
        } else {
            findUser = await prismaConnect.user.findMany({
                where: {
                    id: tokenUserId,
                },
                include: {
                    userClient: {
                        skip,
                        take: pageSize,
                        where: {
                            name: {
                                startsWith: search,
                                mode: 'insensitive'
                            }
                        }
                    }
                }
            });
        }

        if (!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        const totalCount = await prismaConnect.userClient.count({
            where: {
                userId: tokenUserId,
            },
        });

        const totalPages = Math.ceil(totalCount / pageSize);
        
        return {
            page,
            pageSize,
            totalCount,
            totalPages,
            client: findUser[0].userClient,
        }
     }
    
     public async update(
        name: string,
        email: string,
        phone: string, 
        paramsId: string,
        tokenUserId: string
     ) {
        const findUser = await prismaConnect.userClient.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId
            }
        });

        if (!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        const update = await prismaConnect.userClient.update({
            where: {
                id: paramsId,
            },
            data: {
                name,
                email,
                phone
            }
        });
        return update;
     }
    
     public async delete(paramsId: string, tokenUserId: string) {
        const findUser = await prismaConnect.userClient.findFirst({
            where: {
                id: paramsId,
                userId: tokenUserId
            }
        })

        if(!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        const deleteUserClient = await prismaConnect.userClient.delete({
            where: {
                id: paramsId,
            }
        });

        UtilsFileUsers.deleteFolderUser([
            deleteUserClient.userId,
            deleteUserClient.id
        ]);

        return deleteUserClient;
     }
}

export const userClientService = new UserClientService();