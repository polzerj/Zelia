/* const baseurl = "/api";
 */
const baseurl = "http://localhost:5000/api";

export function getRoomInfoUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/`;
}

export function getTimetableUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/timetable`;
}

export function gerRoomListUrl() {
    return `${baseurl}/room/`;
}
