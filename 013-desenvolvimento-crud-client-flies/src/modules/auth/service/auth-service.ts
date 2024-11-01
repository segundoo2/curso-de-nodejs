import { prismaConnect } from "prisma.conn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//enum
import { EStatusErrors } from "enum/status-errors.enum";
//utils
import { UtilsTokenAuth } from "../utils/token-utils";

class AuthService {
    public async login(email: string, password: string) {
        const findUser = await prismaConnect.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        });

        if(!findUser) {
            throw new Error(EStatusErrors.E404);
        }

        if(!bcrypt.compareSync(password, findUser.password)) {
            throw new Error(EStatusErrors.E401);
        }

        return UtilsTokenAuth.jwtGenerate(findUser);
    }
    public async token(refreshToken: string) {
        try {
            await jwt.verify(refreshToken, `${process.env.JWT_REFRESH_TOKEN_SECRET}`);
        } catch (err) {
            console.log('CAIU NO ERRO!!!!');
            throw new Error(EStatusErrors.E401);
        }

        const decoded = ((await jwt.decode(refreshToken) as { payload: {id: string} })).payload;

        const findUser = prismaConnect.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        });

        if(!findUser) {
            throw new Error(EStatusErrors.E404)
        }

        return UtilsTokenAuth.jwtGenerate(findUser)
    }
}
export const authService = new AuthService();