import { Request, Response } from 'express';
import { z } from 'zod';
//enum
import { Ezod } from 'enum/zod.enum';
import { EStatusErrors } from 'enum/status-errors.enum';
import { authService } from '../service/auth-service';

class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const ZUserSchema = z.object({ 
                email: z.string().email({message: `Email ${Ezod.REQUIRED}` }),
                password: z.string().min(1, { message: `Senha ${Ezod.REQUIRED}` })
            });
            ZUserSchema.parse({ email, password });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                data: await authService.login(email, password)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {

            switch (err.message) {
                case EStatusErrors.E401:
                    return res.status(401).json({
                        message: err.message
                    })
                    break;
                case EStatusErrors.E404:
                    return res.status(404).json({
                        message: err.message
                    })
                    break;
            }
        }
    }

    public async token(req: Request, res: Response) {
        const token = req.headers['authorization'] || '';

        try {
            const ZAuthSchema = z.string().min(25, { message: `Token ${Ezod.REQUIRED}` });

            ZAuthSchema.parse(token)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });   
        }

        try {
            return res.json({
                data: await authService.token(token)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            switch (err.message) {
                case EStatusErrors.E401:
                    return res.status(401).json({
                        message: err.message
                    })
                    break;
                case EStatusErrors.E404:
                    return res.status(404).json({
                        message: err.message
                    })
                    break;
            }
        }
    }
}

export const authController = new AuthController();