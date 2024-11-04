import { Router } from 'express';
import { userClientFilesController } from './controller/user-client-files.controller';
import multer from 'multer';

// Middleware
import { middlewareUpload } from 'middleware/upload-middleware';
import { MiddlewareAuth } from 'middleware/auth-middleware';

//Router
const router = Router();
const baseUrl = '/user-client-files';

router.use(MiddlewareAuth.authenticate);
router.post(
    `${baseUrl}/:id`, 
    multer(middlewareUpload.getConfig).single('file'),
    userClientFilesController.create);
router.get(`${baseUrl}/list/:year/:id`, userClientFilesController.listAll);
router.get(`${baseUrl}/:id`, userClientFilesController.read);
router.patch(`${baseUrl}/:id`,
    multer(middlewareUpload.getConfig).single('file'),
    userClientFilesController.update);
router.delete(`${baseUrl}/:id`, userClientFilesController.delete);

export const userClientFilesRouter = router;