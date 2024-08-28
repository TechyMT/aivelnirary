import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
import { emailTemplate } from '@/helper/Templates/emailTemplate';

configDotenv();

interface User {
    email: string;
    name: string;
}

async function sendItineraryEmail(user: User, pdfBuffer: Buffer, pdfFilename: string) {
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Define the email options
        const mailOptions = {
            from: `Travel Itinerary Service <no-reply-${process.env.MAIL_USERNAME}>`, 
            to: user.email, // Receiver's email address
            subject: 'Your Personalized Travel Itinerary', // Subject of the email
            html: emailTemplate(user), // HTML body,
            attachments: [
                {
                    filename: pdfFilename, // Specify the filename for the attachment
                    content: pdfBuffer,    // Use the buffer directly
                    contentType: 'application/pdf',
                },
            ],
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendItineraryEmail };
