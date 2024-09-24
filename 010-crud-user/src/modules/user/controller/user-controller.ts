import { Request, Response } from 'express';
import { z } from 'zod';

// Service
import { userService } from '../service/user-service';
//enum
import { Ezod } from 'enum/zod.enum';
import { ECrud } from 'enum/crud.enum';
import { EStatusErrors } from 'enum/status-errors.enum';

class UserController {
    public async create(req: Request, res: Response) {
        const { name,email, password } = req.body;
        
        try {
            const ZUserSchema = z.object({
                name: z.string().optional(),
                email: z.string().email({ message: `Email ${Ezod.REQUIRED}` }),
                password: z.string().min(8, { message: `Senha é ${Ezod.REQUIRED}` })
            });

            ZUserSchema.parse({ name,email, password })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
                })
        }
        
        try {
            return res.json({
                message:ECrud.CREATE,
                data: await userService.create(name, email, password)
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(409).json({
                message: err.message
            })
        }
    }

    public async read(req: Request, res: Response) {
        const paramsId = req.params.id;

        try {
            const ZUserSchema = z.string().min(30, { message: `O id ${Ezod.REQUIRED}` });
            ZUserSchema.parse(paramsId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(409).json({
                message: err.message
            })
        }
        try {
            return res.json({
                message:ECrud.READ,
                data: await userService.read(paramsId)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message
            });
        }
    }

    public async update(req: Request, res: Response) {
        const { name } = req.body;
        const paramsId = req.params.id;

        try {
            const ZUserSchema = z.object({
                paramsId: z.string().min(30, { message: `O id ${Ezod.REQUIRED}` }),
                name: z.string().min(1, { message: `Nome ${Ezod.REQUIRED}` })
            })
            ZUserSchema.parse({ paramsId, name });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
                })
        }
        
        try {
            return res.json({
                message: ECrud.UPDATE,
                data: await userService.update(paramsId, name)
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
                })
        }
    }

    public async delete(req: Request, res: Response) {
        const paramsId = req.params.id;

        try {
            const ZUserSchema = z.string().min(30, { message: `ID ${Ezod.REQUIRED}` });
            ZUserSchema.parse(paramsId)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: EStatusErrors.E400,
                error: err.errors
                });
        }

        try {
            await userService.delete(paramsId)
            return res.json({
                message: ECrud.DELETE
            });
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: EStatusErrors.E404,
                error: err.errors
                });
        }
    }
}

export const userController = new UserController();