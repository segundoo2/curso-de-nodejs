import { authRouter } from 'modules/auth/router';
import { userRouter } from './modules/user/router';
import { resetPasswordRouter } from 'modules/resetpassword/router';

export const router = [authRouter, userRouter, resetPasswordRouter];