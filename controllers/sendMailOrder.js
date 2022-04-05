const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND,
)

//send mail
const sendEmail = async (mail, url, txt) => {
    console.log(mail)
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = await oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: accessToken
        }
    })
    const mailOptions = {
        from: `DSV SHOP <${SENDER_EMAIL_ADDRESS}>`,
        to: mail,
        subject: "WELCOME TO THE ECOMMERCE SHOP",
        html: `
            <div style="max-width: 700px; margin:auto; border: 5px solid #ddd; border-radius: 10px; padding: 30px 20px; font-size: 100%;">
                <h2 style="text-align: center; text-transform: uppercase; color: teal;">
                    Welcome to the Ecommerce Shop.
                </h2>
                <p>Congratulations! You're almost set to start shopping.
                    Just click the button below to validate your email address.
                </p>
                <div>
                    <a href=${url} style="background: crimson; text-decoration: none; 
                    color: white; padding: 10px 20px; border-radius: 5px;
                    margin: 10px 0; display: inline-block;">
                    ${txt}</a>
                </div>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail