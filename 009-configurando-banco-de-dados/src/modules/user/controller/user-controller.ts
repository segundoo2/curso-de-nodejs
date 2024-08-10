import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

class UserController {
    public async create(req: Request, res: Response) { 
        const prisma = new PrismaClient();
        
        await prisma.user.create({
            data: {
                email: "Edilsonsegundo@teste.com.br",
                name: "Edilson Segundo"
            }
        });

        return res.json ({
            data: 'Criado com sucesso!',
        })
    }

    public read(req: Request, res: Response) { 
        return res.json ({
            data: 'Hello, world!',
        })
    }
};

export const userController = new UserController();