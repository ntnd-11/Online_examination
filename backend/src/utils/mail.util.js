const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

let transporter;

const sendCreateAccountEmail = async (toEmail, name, account, password, role) => {
    const accessToken = await oAuth2Client.getAccessToken();

    const templateFile = fs.readFileSync(
        path.join(__dirname, '../templates/createNewAccountNotif.handlebars'),
        'utf-8',
    );
    const compileTemplateFile = handlebars.compile(templateFile);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAUTH2',
            user: 'hustamination@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    await transporter.sendMail({
        from: '"HUST Examination 👻" <hustamination@gmail.com>',
        to: toEmail,
        subject: 'Account created for HUST Examination',
        html: compileTemplateFile({
            name: name,
            account: account,
            password: password,
            role: role,
        }),
    });
};

module.exports = { sendCreateAccountEmail };
