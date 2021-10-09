import { parse } from "date-fns";
import WebUntisSecretAuth from "./WebUntisSecretAuth";

export default class WebUntisQR extends WebUntisSecretAuth {
    /**
     * Use the data you get from a WebUntis QR code
     * @param QRCodeURI A WebUntis uri. This is the data you get from the QR Code from the webuntis webapp under profile->Data access->Display
     * @param [identity="Awesome"]  A identity like: MyAwesomeApp
     * @param authenticator Custom otplib v12 instance. Default will use the default otplib configuration.
     * @param URL Custom whatwg url implementation. Default will use the nodejs implementation.
     */
    constructor(QRCodeURI: string, identity: string, authenticator: Object) {
        const uri = new URLSearchParams(QRCodeURI);
        super(
            uri.get("school"),
            uri.get("user"),
            uri.get("key"),
            uri.get("url"),
            identity,
            authenticator
        );
    }
}
