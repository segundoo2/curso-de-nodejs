import { Response, Request } from "express";
import { z } from "zod";
//enum
import { EStatusErrors } from "enum/status-errors.enum";
import { Ezod } from "enum/zod.enum";

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
                error: err.erros
            })
        }

        try {
            return res.json({
                message: 'Código enviado para o email.',
                data: await resetPasswordController.validateUser 
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

    // public async validateSecurityCode(req: Request, res: Response) {}
    
    // public async resetPassword(req: Request, res: Response) {}
}

export const resetPasswordController = new ResetPasswordController();