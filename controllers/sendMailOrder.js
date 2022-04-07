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
const sendMailOrder = async (user, order, mes) => {
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
        to: user.email,
        subject: `${mes}`,
        html: `
                <div style="max-width: 700px; margin:auto; border: 5px solid #ddd; border-radius: 10px; padding: 30px 20px; font-size: 100%;">
                <h2 style="text-align: center; text-transform: uppercase; color: teal;">
                   ${mes}
                </h2>
                <p style="font-weight: 600">Hello, ${user.name}</p>
                <p>You order has been confirmed and will be shipped in next two days!</p>
                <p>Order Date: ${order.createdAt}</p>
                <p>Order No: ${order._id}</p>
                <div>Payment: <span><img src="https://img.icons8.com/color/48/000000/mastercard.png" width="20" /></span></div>
                <p>Shiping Address: 135B Tran Hung Dao - Q1</p>
                <p>Subtotal: ${order.totalPrice}.00$</p>
                 
                <p>We will be sending shipping confirmation email when the item shipped successfully!</p>
                <p>Thanks for shopping with us!</p>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendMailOrder