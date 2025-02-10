import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: 'nano_url'
            }
        };
    }

    setTo(reciever) {
        this.mailOptions.to = reciever;
    }
    setSubject(subject) {
        this.mailOptions.subject = subject;
    }
    setText(text) {
        this.mailOptions.text = text;
    }
    setHTML(html) {
        this.mailOptions.html = html;
    }

    async send() {
        try {
            const info = await transporter.sendMail(this.mailOptions);
            console.log('Email sent: ' + info.response);
            return true; // Return true if the email was sent successfully
        } catch (error) {
            console.error('Error sending email:', error);
            return false; // Return false if there was an error
        }
    }

}


export default Mail;