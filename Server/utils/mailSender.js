const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Debug Logs
        console.log(`[MAIL DEBUG] SMTP Host: ${process.env.MAIL_HOST}`);
        const user = process.env.MAIL_USER;
        const maskedUser = user ? user.replace(/(?<=^.{3}).*(?=@)/, '***') : 'UNDEFINED';
        console.log(`[MAIL DEBUG] SMTP User: ${maskedUser}`);

        // Verify connection configuration
        try {
            const verifyResult = await transporter.verify();
            console.log(`[MAIL DEBUG] Transporter verified successfully:`, verifyResult);
        } catch (verifyError) {
            console.error(`[MAIL DEBUG] Transporter verification failed:`, verifyError.message);
            console.error(`[MAIL DEBUG] Exact Reason:`, verifyError);
            throw verifyError;
        }

        let info = await transporter.sendMail({
            from: `StudyNotion <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log(`[MAIL DEBUG] SendMail Result Info:`, {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
        });

        return info;

    } catch (error) {
        console.error("[MAIL DEBUG] Full Mail Error Stack:", error.stack);
        throw error;
    }
};

module.exports = mailSender;
