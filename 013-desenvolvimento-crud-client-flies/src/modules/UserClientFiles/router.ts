import { Router } from 'express';
import { MiddlewareAuth } from 'middleware/auth-middleware';
import { userClientFilesController } from './controller/user-client-files.controller';

//Router
const router = Router();
const baseUrl = '/user-client-files';

router.use(MiddlewareAuth.authenticate);
router.post(`${baseUrl}/:id`, userClientFilesController.create);
router.get(`${baseUrl}`, userClientFilesController.listAll);
router.get(`${baseUrl}`, userClientFilesController.read);
router.patch(`${baseUrl}`, userClientFilesController.update);
router.delete(`${baseUrl}`, userClientFilesController.delete);

export const userClientFilesRouter = router;