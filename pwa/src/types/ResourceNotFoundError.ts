export default class ResourceNotFoundError extends Error {
    constructor(details: string = "") {
        super(`404: ${details}`);
    }
}
