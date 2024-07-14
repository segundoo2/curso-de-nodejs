import { Request, Response } from 'express'

class UserController {
    public read(req: Request, res: Response) { 
        return res.json ({
            data: 'Hello, world!',
        })
    }
};

export const userController = new UserController();