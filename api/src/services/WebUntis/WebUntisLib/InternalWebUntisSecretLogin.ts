import WebUntis from ".";
import find from "lodash.find";
import { AxiosResponse } from "axios";

export default class InternalWebuntisSecretLogin extends WebUntis {
    constructor(
        school: string,
        username: string,
        password: string,
        baseurl: string,
        identity = "Awesome"
    ) {
        super(school, username, password, baseurl, identity);
    }

    protected async _otpLogin(
        token: number,
        username: string,
        time: number,
        skipSessionInfo = false
    ) {
        const url = `/WebUntis/jsonrpc_intern.do?m=getUserData2017&school=${this.school}&v=i2.2`;
        const response = (await this.axios({
            method: "POST",
            url,
            data: {
                id: this.id,
                method: "getUserData2017",
                params: [
                    {
                        auth: {
                            clientTime: time,
                            user: username,
                            otp: token,
                        },
                    },
                ],
                jsonrpc: "2.0",
            },
        })) as AxiosResponse<any>;
        if (response.data && response.data.error)
            throw new Error(
                "Failed to login. " + (response.data.error.message || "")
            );
        if (
            response.headers &&
            response.headers["set-cookie"] &&
            this._getCookieFromSetCookie(response.headers["set-cookie"]) ===
                false
        )
            throw new Error(
                "Failed to login. Server didn't return a session id."
            );
        const sessionId = this._getCookieFromSetCookie(
            response.headers["set-cookie"]
        );
        // Set session temporary
        this.sessionInformation = {
            sessionId: sessionId,
        };

        if (skipSessionInfo) return true;

        // Get personId & personType
        const appConfigUrl = `/WebUntis/api/app/config`;
        const configResponse = (await this.axios({
            method: "GET",
            url: appConfigUrl,
            headers: {
                Cookie: this._buildCookies(),
            },
        })) as AxiosResponse<any>;
        if (
            typeof configResponse.data !== "object" ||
            typeof configResponse.data.data !== "object"
        )
            throw new Error(
                "Failed to fetch app config while login. data (type): " +
                    typeof response.data
            );
        // Path -> data.loginServiceConfig.user.persons -> find person with id
        if (
            configResponse.data.data &&
            configResponse.data.data.loginServiceConfig &&
            configResponse.data.data.loginServiceConfig.user &&
            !Number.isInteger(
                configResponse.data.data.loginServiceConfig.user.personId
            )
        )
            throw new Error(
                "Invalid personId. personId: " +
                    configResponse.data.data.loginServiceConfig.user.personId
            );
        const webUntisLoginServiceUser =
            configResponse.data.data.loginServiceConfig.user;
        if (!Array.isArray(webUntisLoginServiceUser.persons))
            throw new Error(
                "Invalid person array. persons (type): " +
                    typeof webUntisLoginServiceUser.persons
            );
        const person = find(webUntisLoginServiceUser.persons, {
            id: configResponse.data.data.loginServiceConfig.user.personId,
        });
        if (!person) throw new Error("Can not find person in person array.");
        if (!Number.isInteger(person.type))
            throw new Error("Invalid person type. type (type): " + person.type);
        this.sessionInformation = {
            sessionId: sessionId,
            personType: person.type,
            personId: configResponse.data.data.loginServiceConfig.user.personId,
        };
        // Get klasseId
        try {
            const dayConfigUrl = `/WebUntis/api/daytimetable/config`;
            const dayConfigResponse = (await this.axios({
                method: "GET",
                url: dayConfigUrl,
                headers: {
                    Cookie: this._buildCookies(),
                },
            })) as AxiosResponse<any>;
            if (
                typeof dayConfigResponse.data !== "object" ||
                typeof dayConfigResponse.data.data !== "object"
            )
                throw new Error();
            if (!Number.isInteger(dayConfigResponse.data.data.klasseId))
                throw new Error();
            this.sessionInformation = {
                sessionId: sessionId,
                personType: person.type,
                personId:
                    configResponse.data.data.loginServiceConfig.user.personId,
                klasseId: dayConfigResponse.data.data.klasseId,
            };
        } catch (e) {
            // klasseId is not important. This request can fail
        }
        return true;
    }

    protected _getCookieFromSetCookie(
        setCookieArray: string | any[],
        cookieName = "JSESSIONID"
    ) {
        if (!setCookieArray) return false;
        for (let i = 0; i < setCookieArray.length; i++) {
            const setCookie = setCookieArray[i];
            if (!setCookie) continue;
            let cookieParts = setCookie.split(";");
            if (!cookieParts || !Array.isArray(cookieParts)) continue;
            for (let cookie of cookieParts) {
                cookie = cookie.trim();
                cookie = cookie.replace(/;/gm, "");
                const [Key, Value] = cookie.split("=");
                if (!Key || !Value) continue;
                if (Key === cookieName) return Value;
            }
        }
        return false;
    }
}
