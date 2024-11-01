import nodemailer from 'nodemailer'

export class UtilsSendMail {
    public static async send(email: string, secret: number) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAUTH2',
                user: process.env.SEND_MAIL,
                clientId: process.env.SEND_MAIL_CLIENT_ID,
                clientSecret: process.env.SEND_MAIL_CLIENT_SECRET,
                accessToken: 'ya29.a0AcM612wDnV8gUMSgVIFEo3xgWwDEmMlCdl_dzil7WtJP24CGpgSoeXjYw3XSMl2fY0SNl5HzgDNp1_rEz1qPp-98eTP0I1js8iT4uhcwN-1TZ6o1bTqhXkI-plzQrPIhS118fAORTG231tHqS3S0YLcg7HOlYQW8m-Famz5yaCgYKAUUSARESFQHGX2MiXEW-7sOm9F_BNN98dcoXJA0175',
                refreshToken: 'ya29.a0AcM612wDnV8gUMSgVIFEo3xgWwDEmMlCdl_dzil7WtJP24CGpgSoeXjYw3XSMl2fY0SNl5HzgDNp1_rEz1qPp-98eTP0I1js8iT4uhcwN-1TZ6o1bTqhXkI-plzQrPIhS118fAORTG231tHqS3S0YLcg7HOlYQW8m-Famz5yaCgYKAUUSARESFQHGX2MiXEW-7sOm9F_BNN98dcoXJA0175',
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