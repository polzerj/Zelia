export default class MailError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}
