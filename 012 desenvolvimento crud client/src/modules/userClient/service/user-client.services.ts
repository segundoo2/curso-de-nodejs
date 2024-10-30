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
        phone: number
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
    
     public async listAll() {}
    
     public async update() {}
    
     public async delete() {}
}

export const userClientService = new UserClientService();