/*
Name of the module: Project Join Request Mail

Date of module Creation: 26/10/2021

Author of the module: Mohit Prajapati

What the module does: Mails the collaboration request to project creator

Functions supported:
1. sendEmail => Input: to, msg1, msg2, msg3, msg4; Output: "Request Sent Successfully!"

Global variables: ---
*/

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, msg1, msg2, msg3, msg4) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Project Collaboration Tool",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to PCT.</h2>
            <p>${msg1}</p>
            <p>${msg2}</p>
            <p>${msg3}</p>
            <p>${msg4}</p>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) return err;
        return info;
    });
}

module.exports = sendEmail;