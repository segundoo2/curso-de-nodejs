import nodemailer from 'nodemailer'

export class UtilsSendMail {
    public static async send(email: string, secret: number) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.SEND_MAIL,
                pass: process.env.SEND_MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SEND_MAIL,
            to: email,
            subject: '[Segurança] Recupere sua senha',
            text: `Código de segurança: ${secret}`,
        }

        await transporter.sendMail(mailOptions);
    }
}