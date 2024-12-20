import bcrypt from 'bcrypt';
import { prismaConnect } from 'prisma.conn';

//utils
import { UtilsFileUsers } from 'utils/files-utils';

//enum
import { EStatusErrors } from 'enum/status-errors.enum';

class UserService {
    public async create(name: string, email: string, password: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email
            }
        });

        if (findUser) {
            throw new Error(EStatusErrors.E409);
        }

        const create = await prismaConnect.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 6),
            },
            select: {
                id: true,
                name: true,
                email:true,
            }
        });
        UtilsFileUsers.createFolderUser(create.id)

        return create;
    }

    public async read(paramsId: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: paramsId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        if(!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        return findUser;
    }

    public async update(paramsId: string, name:string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                id: paramsId
            }
        })

        if(!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        const update = await prismaConnect.user.update({
            where: {
                id: paramsId
            },
            data: {
                name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return update;
    }

    public async delete(paramsId: string) {
        try {
            UtilsFileUsers.deleteFolderUser(paramsId);

            return await prismaConnect.user.delete({
                where: {
                    id: paramsId
                }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            throw new Error(EStatusErrors.E404);
        }
    }
}

export const userService = new UserService();