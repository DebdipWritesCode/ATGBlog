const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY,
});

const MAILERSEND_SENDER_EMAIL = process.env.MAILERSEND_SENDER_EMAIL;

const sentFrom = new Sender(MAILERSEND_SENDER_EMAIL, "Debdip Mukherjee");

let recipients = [
    // new Recipient(email, name)
];

let emailParams;

const setEmailParams = (subject, html, text) => {
    return emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);
};

const emailDetails = (recipentName, recipentEmail) => {
    recipients = [];
    recipients.push(new Recipient(recipentEmail, recipentName));
};

module.exports = { mailerSend, setEmailParams, emailDetails };