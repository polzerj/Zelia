const crypto = require("crypto");

export default abstract class HashObject {
    private _hash: string;

    constructor(toHash: string) {
        this._hash = crypto.createHash("md5").update(toHash).digest("hex");
    }

    get hash(): string {
        return this._hash;
    }
}
