import { Request, Response } from 'express';
import { z } from 'zod';

// Service
import { userClientService } from '../service/user-client.services';

// Enum
import { Ezod } from 'enum/zod.enum';
import { EStatusErrors } from 'enum/status-errors.enum';
import { ECrud } from 'enum/crud.enum';

class UserClientController {
    public async create(req: Request, res: Response) {
        const { name, email, phone } = req.body;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientSchema = z.string().min(1, `${Ezod.REQUIRED}`);
            ZClientSchema.parse(name);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                message: ECrud.CREATE,
                data: await userClientService.create(
                    tokenUserId, 
                    name, 
                    email, 
                    Number(phone)
                )
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.errors 
            })
        }
    }
    
    public async read(req: Request, res: Response) {
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientSchema = z.string().min(30, { message: `ID ${Ezod.REQUIRED}` });
            ZClientSchema.parse(paramsId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                message: ECrud.READ,
                data: await userClientService.read(paramsId, tokenUserId)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.errors
            });
        }
    }
    
    public async listAll(req: Request, res: Response) {}
    
    public async update(req: Request, res: Response) {}
    
    public async delete(req: Request, res: Response) {}
}

export const userClientController = new UserClientController();