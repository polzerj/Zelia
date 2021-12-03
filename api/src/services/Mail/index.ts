import Booking from "../../types/Booking";
import Report from "../../types/Report";
import MailError from "./MailError";

import nodemailer = require("nodemailer");

const { EMAIL_NAME, EMAIL_PASSWORD } = process.env;

const transportOptions = {
    host: "smtp.office365.com",
    port: "587",
    auth: { user: EMAIL_NAME, pass: EMAIL_PASSWORD },
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
};

const mailTransport = nodemailer.createTransport(transportOptions);

export async function sendVerificationMail(req: Booking | Report) {
    try {
        await mailTransport.sendMail({
            to: req.user,
            subject: "Bestätigunslink",
            text: "zelia.at/verify/" + req.hash,
        });
    } catch (err) {
        throw new MailError("Couldn't send mail");
    }
}
