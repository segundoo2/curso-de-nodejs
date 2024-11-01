import { authRouter } from 'modules/auth/router';
import { userRouter } from './modules/user/router';
import { resetPasswordRouter } from 'modules/resetpassword/router';
import { userClientRouter } from 'modules/userClient/router';

export const router = [
    authRouter,
    userRouter,
    resetPasswordRouter,
    userClientRouter
];