import Report from "../types/Report";
import Booking from "../types/Booking";

class RequestManager {
    private requestMap: { [hash: string]: Booking | Report } = {};
    private expirationMap: { [hash: string]: NodeJS.Timeout } = {};

    public add(request: Booking | Report) {
        this.requestMap[request.hash] = request;
        console.log(request);

        this.expirationMap[request.hash] = setTimeout(() => {
            this.close(request.hash);
        }, 1000 * 60 * 5);
    }

    public close(hash: string) {
        let req = this.requestMap[hash];
        delete this.requestMap[hash];

        clearTimeout(this.expirationMap[hash]);
        delete this.expirationMap[hash];

        return req;
    }
}

export default new RequestManager();
