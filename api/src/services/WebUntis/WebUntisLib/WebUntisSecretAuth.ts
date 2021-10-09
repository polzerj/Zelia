import InternalWebuntisSecretLogin from "./InternalWebUntisSecretLogin";

export default class WebUntisSecretAuth extends InternalWebuntisSecretLogin {
    secret: any;
    authenticator: any;
    /**
     * @param school The school identifier
     * @param user
     * @param secret
     * @param baseurl Just the host name of your WebUntis (Example: mese.webuntis.com)
     * @param [identity="Awesome"] A identity like: MyAwesomeApp
     * @param authenticator Custom otplib v12 instance. Default will use the default otplib configuration.
     */
    constructor(
        school: string,
        user: string,
        secret: any,
        baseurl: string,
        identity = "Awesome",
        authenticator: any
    ) {
        super(school, user, null, baseurl, identity);
        this.secret = secret;
        this.authenticator = authenticator;
        if (!authenticator) {
            // React-Native will not eval this expression
            const { authenticator } = eval("require('otplib')");
            this.authenticator = authenticator;
        }
    }

    async login() {
        // Get JSESSION
        const token = this.authenticator.generate(this.secret);
        const time = new Date().getTime();
        return await this._otpLogin(token, this.username, time);
    }
}
