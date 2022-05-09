const nodemailer = require("nodemailer");
// const fs = require("fs");
// const img = fs.readFileSync("./uploads/téléchargement.jpeg");

const mail = async(receiverMail, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"No reply - CMDB 👻" <clementine.digny@gmail.com',
        to: receiverMail,
        subject: subject,
        text: text,
        html: `<p>${text}</p>`,
        // attachments: [
        //   {
        //     filename: "téléchargement.jpeg",
        //     content: img,
        //   },
        // ],
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = mail;