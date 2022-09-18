
const sgMail = require('@sendgrid/mail');

function sendEmail(dest, message , attachment ) {
    try {
        if(!attachment){
            attachment = []
        }
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: dest,
            from: 'mohamedMsaber2@gmail.com', // Use the email address or domain you verified above
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: message,
            attachments: attachment
        };
        (async () => {
            try {
                await sgMail.send(msg);
            } catch (error) {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            }
        })();
    } catch (error) {
        console.error("catch Error Email", error)
    }

}

module.exports = sendEmail

