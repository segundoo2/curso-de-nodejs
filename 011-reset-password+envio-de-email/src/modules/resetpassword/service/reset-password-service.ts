import { prismaConnect } from "prisma.conn";
import { UtilsSendMail } from "../utils/send-mail-utils";

//enum
import { EStatusErrors } from "enum/status-errors.enum";

class ResetPasswordService {
    public async validateUser(email: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
            include: {
                resetPasswordSecret: true
            },
        })

        if (!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        if (!findUser.resetPasswordSecret) {
            const generateSecret = Number(Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join(''));

            const { secret } = await prismaConnect.resetPasswordSecret.create({
                data: {
                    secret: generateSecret,
                    userId: findUser.id
                },
                select: {
                    secret:true
                }
            });

            UtilsSendMail.send(email, secret)
            return { email, secret };
        }
        UtilsSendMail.send(email, findUser.resetPasswordSecret.secret);
        return { email, secret: findUser.resetPasswordSecret.secret };
    }
    public async validateSecurityCode() {}
    public async ResetPassword() {}
}

export const resetPasswordService = new ResetPasswordService();