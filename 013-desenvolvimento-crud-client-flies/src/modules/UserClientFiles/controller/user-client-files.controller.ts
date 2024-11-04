import fs from 'node:fs';
import path from 'node:path';

import { Request, Response } from "express";
import mime from 'mime';
import { z } from "zod";

//service
import { userClientFileService } from '../service/user-client-files.services';

//enum
import { EStatusErrors } from 'enum/status-errors.enum';
import { ECrud } from 'enum/crud.enum';
import { Ezod } from "enum/zod.enum";


class UserClientFilesController{
    public async create(req: Request, res: Response) {
        const tokenUserId = req.tokenUserId;
        const paramsId = req.params.id;

        const { name, date, description } = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({
                message: EStatusErrors.E400,
            });
        }

        const fileType = mime.getType(file.originalname);

        try {
            const conditions = ['png', 'jpg', 'jpeg']

            const ZClientFileSchema = z.object({
                paramsId: z.string().min(30, `UC_ID ${Ezod.REQUIRED}`),
                name: z.string().min(1, `Nome ${Ezod.REQUIRED}`),
                date: z.string().datetime(`Data ${Ezod.REQUIRED}`),
                file: z
                .any()
                .refine(() => conditions.some((ext) => fileType?.includes(ext)), {
                    message: `Upload aceita apenas: ${conditions}`
                })
            });

            ZClientFileSchema.parse({ paramsId, name, date, file });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const fileUrl = ['assets', 'files', tokenUserId, paramsId];
            if(fs.existsSync(path.resolve(...fileUrl))){
                fs.rmSync(path.resolve(...fileUrl, file.filename));
            }

            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                message: ECrud.CREATE,
                data: await userClientFileService.create(
                    paramsId,
                    tokenUserId,
                    name,
                    date,
                    description,
                    file.filename
                )
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

    public async read(req: Request, res: Response) {
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientFileSchema = z
                .string()
                .min(30, { message: `UCF_ID ${Ezod.REQUIRED}` });
            ZClientFileSchema.parse(paramsId)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err:any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            res.json({
                message: ECrud.READ,
                data: await userClientFileService.read(paramsId, tokenUserId)
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err:any) {
            return res.status(404).json({
                error: err.message
            });
        }
    }

    public async listAll(req: Request, res: Response) {
        const paramsId = req.params.id;
        const paramsYear = req.params.year;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientFileSchema = z.object({
                paramsId: z.string().min(30, {message: `UC_ID ${Ezod.REQUIRED}`}),
                paramsYear: z.string().min(4, {message: `Data ${Ezod.REQUIRED}`}),
            });
            ZClientFileSchema.parse({paramsId, paramsYear});
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
                data: await userClientFileService.listAll(
                    paramsId, 
                    paramsYear, 
                    tokenUserId
                )
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message
            })
        }
    }

    public async update(req: Request, res: Response) {
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        const { id, name, date, description } = req.body;
        const file = req.file;

        if(!file) {
            return res.status(400).json({
                message: EStatusErrors.E400
            });
        }

        const fileType = mime.getType(file.originalname);

        try {
            const conditions = ['png', 'jpg', 'jpeg']

            const ZClientFileSchema = z.object({
                paramsId: z.string().min(30, `UC_ID ${Ezod.REQUIRED}`),
                id: z.string().min(30, `UCF_ID ${Ezod.REQUIRED}`),
                name: z.string().min(1, `Nome ${Ezod.REQUIRED}`),
                date: z.string().datetime(`Data ${Ezod.REQUIRED}`),
                file: z
                .any()
                .refine(() => conditions.some((ext) => fileType?.includes(ext)), {
                    message: `Upload aceita apenas: ${conditions}`
                })
            });

            ZClientFileSchema.parse({ paramsId, id, name, date, file });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const fileUrl = ['assets', 'files', tokenUserId, paramsId];
            if(fs.existsSync(path.resolve(...fileUrl))){
                fs.rmSync(path.resolve(...fileUrl, file.filename));
            }

            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                message: ECrud.UPDATE,
                data: await userClientFileService.update(
                    paramsId,
                    tokenUserId,
                    id,
                    name,
                    date,
                    description,
                    file.filename
                )
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

    public async delete(req: Request, res: Response) {
        const paramsId = req.params.id;
        const tokenUserId = req.tokenUserId;

        try {
            const ZClientFileSchema = z
            .string()
            .min(30, `ID ${Ezod.REQUIRED}`);

            ZClientFileSchema.parse(paramsId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            })
        }

        try {
            await userClientFileService.delete(paramsId, tokenUserId);
            return res.json({
                message: ECrud.DELETE
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                error: err.message
            })
        }
    }

}

export const userClientFilesController = new UserClientFilesController();