import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

//enum
import { Ezod } from "enum/zod.enum";
import { EStatusErrors } from "enum/status-errors.enum";

export class MiddlewareAuth{
    public static async authenticate(
        req: Request, 
        res: Response,
        next: NextFunction
    ){
        const token = req.headers['authorization'] || '';

        try {
            const ZAuthSchema = z.string().min(25, `Token ${Ezod.REQUIRED}`);

            ZAuthSchema.parse(token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                errors: err.errors
            })
        }

        try {
            await jwt.verify(token, `${process.env.JWT_SECRET}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            res.status(401).json({
                message: EStatusErrors.E401
            });
        }

        const paramsId = req.params.id;
        const decoded = ((await jwt.decode(token) as { payload: {id: string} })).payload;

        if (paramsId && paramsId !== decoded.id) {
            return res.status(400).json({
                message: EStatusErrors.E400
            })
        }

        next();
    }
}