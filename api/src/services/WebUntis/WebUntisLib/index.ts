import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { serialize } from "cookie";
import Base64 from "./Base64";
import { parse, startOfDay } from "date-fns";
import WebUntisSecretAuth from "./WebUntisSecretAuth";
import WebUntisQR from "./WebUntisQr";
import WebUntisAnonymousAuth from "./WebUntisAnonymousAuth";
import LoginSessionInformations from "./LoginSessionInformations";
import WebUntisElementType from "./WebUntisElementType";
import Lesson from "./Lesson";
import Student from "./Student";
import Room from "./Room";
import Klasse from "./Klasse";
import Department from "./Department";
import Holiday from "./Holiday";
import StatusData from "./StatusData";
import Homework from "./Homework";
import Subject from "./Subject";
import Timegrid from "./Timegrid";
import { NewsWidget } from "./NewsWidget";
import Teacher from "./Teacher";

/**
 * WebUntis API Class
 */
export default class WebUntis {
    protected school: string;
    protected schonolbase64: string;
    protected username: string;
    protected password: string;
    protected baseurl: string;
    protected cookies: any[];
    protected id: string;
    protected sessionInformation: LoginSessionInformations;
    protected anonymous: boolean;
    protected axios: AxiosInstance;

    static WebUntisSecretAuth: typeof WebUntisSecretAuth;
    static WebUntisQR: typeof WebUntisQR;
    static WebUntisAnonymousAuth: typeof WebUntisAnonymousAuth;
    static TYPES: {
        CLASS: number;
        TEACHER: number;
        SUBJECT: number;
        ROOM: number;
        STUDENT: number;
    };
    /**
     *
     * @constructor
     * @param school The school identifier
     * @param baseurl Just the host name of your WebUntis (Example: mese.webuntis.com)
     * @param identity A identity like: MyAwesomeApp
     */
    constructor(
        school: string,
        username: string,
        password: string,
        baseurl: string,
        identity: string = "Awesome"
    ) {
        this.school = school;
        this.schonolbase64 = "_" + Base64.btoa(this.school);
        this.username = username;
        this.password = password;
        this.baseurl = "https://" + baseurl + "/";
        this.cookies = [];
        this.id = identity;
        this.sessionInformation = {};
        this.anonymous = false;

        this.axios = axios.create({
            baseURL: this.baseurl,
            maxRedirects: 0,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                "X-Requested-With": "XMLHttpRequest",
            },
            validateStatus: function (status) {
                return status >= 200 && status < 303; // default
            },
        });
    }

    /**
     * Logout the current session
     */
    async logout(): Promise<boolean> {
        await this.axios({
            method: "POST",
            url: `/WebUntis/jsonrpc.do`,
            params: {
                school: this.school,
            },
            data: {
                id: this.id,
                method: "logout",
                params: {},
                jsonrpc: "2.0",
            },
        });
        this.sessionInformation = null;
        return true;
    }

    /**
     * Login with your credentials
     *
     * **Notice: The server may revoke this session after less than 10min of idle.**
     *
     * *Untis says in the official docs:*
     * > An application should always logout as soon as possible to free system resources on the server.
     */
    async login(): Promise<Object> {
        const response = await (this.axios({
            method: "POST",
            url: `/WebUntis/jsonrpc.do`,
            params: {
                school: this.school,
            },
            data: {
                id: this.id,
                method: "authenticate",
                params: {
                    user: this.username,
                    password: this.password,
                    client: this.id,
                },
                jsonrpc: "2.0",
            },
        }) as AxiosPromise<any>);
        if (typeof response.data !== "object")
            throw new Error("Failed to parse server response.");
        if (!response.data.result)
            throw new Error(
                "Failed to login. " + JSON.stringify(response.data)
            );
        if (response.data.result.code)
            throw new Error(
                "Login returned error code: " + response.data.result.code
            );
        if (!response.data.result.sessionId)
            throw new Error("Failed to login. No session id.");
        this.sessionInformation = response.data.result;
        return response.data.result;
    }

    /**
     * Get the latest WebUntis Schoolyear
     * @param {Boolean} [validateSession=true]
     * @returns {Promise<{name: String, id: Number, startDate: Date, endDate: Date}>}
     */
    async getLatestSchoolyear(
        validateSession: boolean = true
    ): Promise<{ name: String; id: Number; startDate: Date; endDate: Date }> {
        const data = await this._request("getSchoolyears", {}, validateSession);
        data.sort((a: { startDate: string }, b: { startDate: string }) => {
            const na = parse(a.startDate, "yyyyMMdd", new Date());
            const nb = parse(b.startDate, "yyyyMMdd", new Date());
            return nb.getTime() - na.getTime();
        });
        if (!data[0]) throw new Error("Failed to receive school year");
        return {
            name: data[0].name,
            id: data[0].id,
            startDate: parse(data[0].startDate, "yyyyMMdd", new Date()),
            endDate: parse(data[0].endDate, "yyyyMMdd", new Date()),
        };
    }

    /**
     * Get News Widget
     */
    async getNewsWidget(
        date: Date,
        validateSession = true
    ): Promise<NewsWidget> {
        if (validateSession && !(await this.validateSession()))
            throw new Error("Current Session is not valid");
        const response = await (this.axios({
            method: "GET",
            url: `/WebUntis/api/public/news/newsWidgetData`,
            params: {
                data: this.convertDateToUntis(date),
            },
            headers: {
                Cookie: this._buildCookies(),
            },
        }) as AxiosPromise<any>);
        if (typeof response.data.data !== "object")
            throw new Error("Server returned invalid data.");
        return response.data.data;
    }

    protected _checkAnonymous() {
        if (this.anonymous) {
            throw new Error(
                "This method is not supported with anonymous login"
            );
        }
    }

    protected _buildCookies() {
        let cookies = [];
        cookies.push(
            serialize("JSESSIONID", this.sessionInformation.sessionId)
        );
        // cookies.push(serialize("schoolname", this.schoolbase64));
        return cookies.join("; ");
    }

    private schoolbase64(arg0: string, schoolbase64: any): any {
        throw new Error("Method not implemented.");
    }

    /**
     * Checks if your current WebUntis Session is valid
     */
    async validateSession(): Promise<boolean> {
        if (!this.sessionInformation) return false;
        const response = await (this.axios({
            method: "POST",
            url: `/WebUntis/jsonrpc.do`,
            params: {
                school: this.school,
            },
            headers: {
                Cookie: this._buildCookies(),
            },
            data: {
                id: this.id,
                method: "getLatestImportTime",
                params: {},
                jsonrpc: "2.0",
            },
        }) as AxiosPromise<any>);
        return typeof response.data.result === "number";
    }

    /**
     * Get the time when WebUntis last changed it's data
     */
    async getLatestImportTime(validateSession = true): Promise<number> {
        return this._request("getLatestImportTime", {}, validateSession);
    }

    protected async _timetableRequest(
        id: number,
        type: WebUntisElementType,
        startDate: Date,
        endDate: Date,
        validateSession = true
    ): Promise<Lesson[]> {
        const additionalOptions: { startDate?: string; endDate?: string } = {};
        if (startDate) {
            additionalOptions.startDate = this.convertDateToUntis(startDate);
        }
        if (endDate) {
            additionalOptions.endDate = this.convertDateToUntis(endDate);
        }

        return this._request(
            "getTimetable",
            {
                options: {
                    id: new Date().getTime(),
                    element: {
                        id,
                        type,
                    },
                    ...additionalOptions,
                    showLsText: true,
                    showStudentgroup: true,
                    showLsNumber: true,
                    showSubstText: true,
                    showInfo: true,
                    showBooking: true,
                    klasseFields: ["id", "name", "longname", "externalkey"],
                    roomFields: ["id", "name", "longname", "externalkey"],
                    subjectFields: ["id", "name", "longname", "externalkey"],
                    teacherFields: ["id", "name", "longname", "externalkey"],
                },
            },
            validateSession
        );
    }

    /**
     * Get your own Timetable for the current day
     * Note: You can't use this with anonymous login
     */
    async getOwnTimetableForToday(validateSession = true) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.personId,
            this.sessionInformation.personType,
            null,
            null,
            validateSession
        );
    }

    /**
     * Get the timetable of today for a specific element.
     */
    async getTimetableForToday(
        id: number,
        type: WebUntisElementType,
        validateSession: boolean = true
    ) {
        return await this._timetableRequest(
            id,
            type,
            null,
            null,
            validateSession
        );
    }

    /**
     * Get your own Timetable for the given day
     * Note: You can't use this with anonymous login
     */
    async getOwnTimetableFor(date: Date, validateSession: boolean = true) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.personId,
            this.sessionInformation.personType,
            date,
            date,
            validateSession
        );
    }

    /**
     * Get the timetable for a specific day for a specific element.
     */
    async getTimetableFor(
        date: Date,
        id: number,
        type: WebUntisElementType,
        validateSession: boolean = true
    ) {
        return await this._timetableRequest(
            id,
            type,
            date,
            date,
            validateSession
        );
    }

    /**
     * Get your own timetable for a given Date range
     * Note: You can't use this with anonymous login
     */
    async getOwnTimetableForRange(
        rangeStart: Date,
        rangeEnd: Date,
        validateSession: boolean = true
    ) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.personId,
            this.sessionInformation.personType,
            rangeStart,
            rangeEnd,
            validateSession
        );
    }

    /**
     * Get the timetable for a given Date range for specific element
     */
    async getTimetableForRange(
        rangeStart: Date,
        rangeEnd: Date,
        id: number,
        type: WebUntisElementType,
        validateSession: boolean = true
    ) {
        return await this._timetableRequest(
            id,
            type,
            rangeStart,
            rangeEnd,
            validateSession
        );
    }

    /**
     * Get the Timetable of your class for today
     * Note: You can't use this with anonymous login
     */
    async getOwnClassTimetableForToday(validateSession: boolean = true) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.klasseId,
            1,
            null,
            null,
            validateSession
        );
    }

    /**
     * Get the Timetable of your class for the given day
     * Note: You can't use this with anonymous login
     */
    async getOwnClassTimetableFor(date: Date, validateSession: boolean = true) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.klasseId,
            1,
            date,
            date,
            validateSession
        );
    }

    /**
     * Get the Timetable of your class for a given Date range
     * Note: You can't use this with anonymous login
     */
    async getOwnClassTimetableForRange(
        rangeStart: Date,
        rangeEnd: Date,
        validateSession: boolean = true
    ) {
        this._checkAnonymous();
        return await this._timetableRequest(
            this.sessionInformation.klasseId,
            1,
            rangeStart,
            rangeEnd,
            validateSession
        );
    }

    async getHomeWorksFor(
        rangeStart: Date,
        rangeEnd: Date,
        validateSession: boolean = true
    ): Promise<Homework[]> {
        if (validateSession && !(await this.validateSession()))
            throw new Error("Current Session is not valid");
        const response = (await this.axios({
            method: "GET",
            url: `/WebUntis/api/homeworks/lessons`,
            params: {
                startDate: this.convertDateToUntis(rangeStart),
                endDate: this.convertDateToUntis(rangeEnd),
            },
            headers: {
                Cookie: this._buildCookies(),
            },
        })) as AxiosResponse<any>;
        if (typeof response.data.data !== "object")
            throw new Error("Server returned invalid data.");
        if (!response.data.data["homeworks"])
            throw new Error("Data object doesn't contains homeworks object.");
        return response.data.data;
    }

    /**
     * Converts the untis date string format to a normal JS Date object
     * @param date Untis date string
     * @param Base date. Default beginning of current day
     */
    static convertUntisDate(
        date: string,
        baseDate: Date = startOfDay(new Date())
    ) {
        if (typeof date !== "string") date = `${date}`;
        return parse(date, "yyyyMMdd", baseDate);
    }

    /**
     * Convert a untis time string to a JS Date object
     * @param time Untis time string
     * @param Day used as base for the time. Default: Current date

     */
    static convertUntisTime(time: string, baseDate: Date = new Date()) {
        if (typeof time !== "string") time = `${time}`;
        return parse(time, "Hmm", baseDate);
    }

    /**
     * Get all known Subjects for the current logged in user
     */
    async getSubjects(validateSession: boolean = true): Promise<Subject[]> {
        return await this._request("getSubjects", {}, validateSession);
    }

    /**
     * Get the timegrid of current school
     */
    async getTimegrid(validateSession: boolean = true): Promise<Timegrid> {
        return await this._request("getTimegridUnits", {}, validateSession);
    }

    async getHomeWorkAndLessons(
        rangeStart: Date,
        rangeEnd: Date,
        validateSession: boolean = true
    ) {
        if (validateSession && !(await this.validateSession()))
            throw new Error("Current Session is not valid");
        const response = (await this.axios({
            method: "GET",
            url: `/WebUntis/api/homeworks/lessons`,
            params: {
                startDate: this.convertDateToUntis(rangeStart),
                endDate: this.convertDateToUntis(rangeEnd),
            },
            headers: {
                Cookie: this._buildCookies(),
            },
        })) as AxiosResponse<any>;
        if (typeof response.data.data !== "object")
            throw new Error("Server returned invalid data.");
        if (!response.data.data["homeworks"])
            throw new Error("Data object doesn't contains homeworks object.");
        return response.data.data;
    }

    /**
     * Get all known teachers by WebUntis
     */
    async getTeachers(validateSession: boolean = true): Promise<Teacher> {
        return await this._request("getTeachers", {}, validateSession);
    }

    /**
     * Get all known students by WebUntis
     */
    async getStudents(validateSession: boolean = true): Promise<Student[]> {
        return await this._request("getStudents", {}, validateSession);
    }

    /**
     * Get all known rooms by WebUntis
     */
    async getRooms(validateSession: boolean = true): Promise<Room[]> {
        return await this._request("getRooms", {}, validateSession);
    }

    /**
     * Get all classes known by WebUntis
     */
    async getClasses(validateSession: boolean = true): Promise<Klasse[]> {
        return await this._request("getKlassen", {}, validateSession);
    }

    /**
     * Get all departments known by WebUntis
     */
    async getDepartments(
        validateSession: boolean = true
    ): Promise<Department[]> {
        return await this._request("getDepartments", {}, validateSession);
    }

    /**
     * Get all holidays known by WebUntis
     */
    async getHolidays(validateSession: boolean = true): Promise<Holiday[]> {
        return await this._request("getHolidays", {}, validateSession);
    }

    /**
     * Get all status data known by WebUntis
     */
    async getStatusData(
        validateSession: boolean = true
    ): Promise<StatusData[]> {
        return await this._request("getStatusData", {}, validateSession);
    }

    /**
     * Convert a JS Date Object to a WebUntis date string
     */
    convertDateToUntis(date: Date) {
        return (
            date.getFullYear().toString() +
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
            ).toString() +
            (date.getDate() < 10
                ? "0" + date.getDate()
                : date.getDate()
            ).toString()
        );
    }

    /**
     * Make a JSON RPC Request with the current session
     * @param validateSession Whether the session should be checked first
     */
    protected async _request(
        method: string,
        parameter: any = {},
        validateSession = true,
        url: string = `/WebUntis/jsonrpc.do`
    ) {
        if (validateSession && !(await this.validateSession()))
            throw new Error("Current Session is not valid");
        const response = await (this.axios({
            method: "POST",
            url: url,
            params: {
                school: this.school,
            },
            headers: {
                Cookie: this._buildCookies(),
            },
            data: {
                id: this.id,
                method: method,
                params: parameter,
                jsonrpc: "2.0",
            },
        }) as AxiosPromise<any>);
        if (!response.data.result)
            throw new Error("Server didn't returned any result.");
        if (response.data.result.code)
            throw new Error(
                "Server returned error code: " + response.data.result.code
            );
        return response.data.result;
    }
}
