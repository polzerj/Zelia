/* const baseurl = "/api";
 */
const baseurl = "http://localhost:5000/api";
export function getTimetableUrl(roomNr: string) {
    return `${baseurl}/room/${roomNr}/timetable`;
}
