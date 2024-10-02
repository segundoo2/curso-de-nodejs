import { Router } from 'express';
import { resetPasswordController } from './controller/reset-password-controller';

//Router
const router = Router();
const baseUrl = '/reset-password';

router.post(
    `${baseUrl}`, 
    resetPasswordController.validateUser
);
router.post(
    `${baseUrl}/validate`, 
    resetPasswordController.validateSecurityCode
);

router.patch(
    `${baseUrl}`, 
    resetPasswordController.resetPassword
);

export const resetPasswordRouter = router;