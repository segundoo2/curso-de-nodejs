import { Router } from 'express';
import { userController } from './controller/user-controller';

//Router
const router = Router();
const baseUrl = '/user';

router.get(`${baseUrl}/read`, userController.read);

export const userRouter = router;