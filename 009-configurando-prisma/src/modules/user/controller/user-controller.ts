import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class UserController {
    public async create(req: Request, res: Response) { 

        const prisma = new PrismaClient();

        await prisma.user.create({
            data: {
                email: "edilson@gmail.com",
                name: "Edilson"
            }
        })

        return res.json ({
            data: 'Criado com sucesso!',
        })
    };

    public read(req: Request, res: Response) { 
        return res.json ({
            data: 'Hello, world!',
        })
    
    };
}

export const userController = new UserController();