import { Request, Response } from 'express';
import { string, z } from 'zod';

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
                    phone
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
    
    public async listAll(req: Request, res: Response) {
        const tokenUserId = req.tokenUserId;
        let page = Number(req.query.page);
        const search = req.query.search ? String(req.query.search) : undefined;

        if (!page || page <= 0 || isNaN(page)) {
            page = 1;
        }

        try {
            return res.json({
                message: ECrud.READ,
                data: await userClientService.listAll(tokenUserId, page, search)
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message
            })
        }
    }
    
    public async update(req: Request, res: Response) {
        const { name, email, phone } = req.body;
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientSchema = z.object({
                name: z.string().min(1, { message: `Nome ${Ezod.REQUIRED}` }),
                paramsId: z.string().min(30, { message: `ID ${Ezod.REQUIRED}` })
            });

            ZClientSchema.parse({ name, paramsId })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors,
            });
        }

        try {
            return res.json({
                message: ECrud.UPDATE,
                data: await userClientService.update(
                    name,
                    email,
                    phone, 
                    paramsId,
                    tokenUserId
                ),
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message,
            })
        }
    }
    
    public async delete(req: Request, res: Response) {
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientSchema = z.string().min(30, { message: `ID ${Ezod.REQUIRED}` })

            ZClientSchema.parse(paramsId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            await userClientService.delete(paramsId, tokenUserId);
            return res.json({
                message: ECrud.DELETE,
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message
            })
        }
    }
}

export const userClientController = new UserClientController();