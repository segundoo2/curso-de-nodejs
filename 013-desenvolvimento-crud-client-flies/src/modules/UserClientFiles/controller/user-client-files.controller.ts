import { Request, Response } from "express";
import mime from 'mime';

//service
import { userClientFileService } from '../service/user-client-files.services';

//enum
import { EStatusErrors } from 'enum/status-errors.enum';
import { ECrud } from 'enum/crud.enum';

class UserClientFilesController{
    public async create(req: Request, res: Response) {
        const tokenUserId = req.tokenUserId;
        const paramsId = req.params.id;
        let { name, date, description, file } = req.body;

        const fileType = mime.getType(file);

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
            return res.status(400).json({
                message: EStatusErrors.E400,
                error: err.errors
            });
        }

        try {
            return res.json({
                message: ECrud.CREATE,
                data: await userClientFileService.create()
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

    public async read(req: Request, res: Response) {}

    public async listAll(req: Request, res: Response) {}

    public async update(req: Request, res: Response) {}

    public async delete(req: Request, res: Response) {}

}

export const userClientFilesController = new UserClientFilesController();