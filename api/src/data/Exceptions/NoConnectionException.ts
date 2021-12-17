export class NoConnectionException extends Error {
    constructor() {
        super("Unable to connect to WebUntis");
    }
}