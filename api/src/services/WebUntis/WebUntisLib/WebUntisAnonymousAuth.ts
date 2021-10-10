import { AxiosResponse } from "axios";
import InternalWebuntisSecretLogin from "./InternalWebUntisSecretLogin";

export default class WebUntisAnonymousAuth extends InternalWebuntisSecretLogin {
    constructor(school: string, baseurl: string, identity = "Awesome") {
        super(school, null, null, baseurl, identity);
        this.username = "#anonymous#";
        this.anonymous = true;
    }

    async login() {
        // Check whether the school has public access or not
        const url = `/WebUntis/jsonrpc_intern.do`;
        const response = (await this.axios({
            method: "POST",
            url,
            params: {
                m: "getAppSharedSecret",
                school: this.school,
                v: "i3.5",
            },
            data: {
                id: this.id,
                method: "getAppSharedSecret",
                params: [
                    {
                        userName: "#anonymous#",
                        password: "",
                    },
                ],
                jsonrpc: "2.0",
            },
        })) as AxiosResponse<any>;

        if (response.data && response.data.error)
            throw new Error(
                "Failed to login. " + (response.data.error.message || "")
            );

        // OTP never changes when using anonymous login
        const otp = 100170;
        const time = new Date().getTime();
        return await this._otpLogin(otp, this.username, time, true);
    }
}
