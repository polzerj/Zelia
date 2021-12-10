/* const baseurl = "/api";
 */
const baseurl = `https://${window.location.hostname}/api`;

export function getRoomInfoUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/`;
}

export function getTimetableUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/timetable/`;
}

export function getRoomListUrl() {
    return `${baseurl}/room/`;
}

export function getTimegridUrl() {
    return `${baseurl}/timegrid/`;
}

export function getRoomReportUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/report`;
}

export function getBookingReportUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/book`;
}

export function getAdminLoginUrl() {
    return `${baseurl}/admin/login`;
}
