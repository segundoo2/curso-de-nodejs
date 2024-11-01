import { Response, Request } from "express";
import { z } from "zod";
//enum
import { EStatusErrors } from "enum/status-errors.enum";
import { Ezod } from "enum/zod.enum";
import { resetPasswordService } from "../service/reset-password-service";
import { ECrud } from "enum/crud.enum";

class ResetPasswordController {
    public async validateUser(req: Request, res: Response) {
        const email = req.body.email;
        try {
            const ZUserSchema = 
                z.string().
                email({ message: `Email ${Ezod.REQUIRED}` });

                ZUserSchema.parse(email);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            })
        }

        try {
            return res.json({
                message: 'Código enviado para o email.',
                data: await resetPasswordService.validateUser(email) 
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

    public async validateSecurityCode(req: Request, res: Response) {
        const { email, secret } = req.body;
        try {
            const ZUserSchema = z.object({
                email: z.string().email({ message: `Email ${Ezod.REQUIRED}` }),
                secret: z.string().min(6, { message: `Segredo ${Ezod.REQUIRED}` })
            });

            ZUserSchema.parse({ email, secret });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            })
        }

        try {
            return res.json({
                message: ECrud.READ,
                data: await resetPasswordService.validateSecurityCode(email, Number(secret))
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }
    
    public async resetPassword(req: Request, res: Response) {
        const { email, secret, newPassword } = req.body;
        try {
            const ZUserSchema = z.object({
                email: z.string().email({ message: `Email ${Ezod.REQUIRED}` }),
                secret: z.string().min(6, { message: `Segredo ${Ezod.REQUIRED}` }),
                newPassword: z.string().min(8, { message: `Nova senha ${Ezod.REQUIRED}` })
            });

            ZUserSchema.parse({ email, secret, newPassword });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            })
        }

        try {
            return res.json({
                message: ECrud.READ,
                data: await resetPasswordService.ResetPassword(
                    email,
                    Number(secret),
                    newPassword
                )
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }
}

export const resetPasswordController = new ResetPasswordController();