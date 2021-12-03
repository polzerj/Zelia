import Booking from "types/Booking";
import MailError from "./MailError";

const nodemailer = require("nodemailer");

const transportOptions = {
    host: "smtp.office365.com",
    port: "587",
    auth: { user: "EMAIL", pass: "PASSWORD" },
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
};

const mailTransport = nodemailer.createTransport(transportOptions);

export async function sendVerificationMail(req: Booking) {
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
