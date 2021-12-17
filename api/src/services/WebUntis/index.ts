import WebUntisCache from "./WebuntisCache";
import WebUntis from "./WebUntisLib";
import Lesson from "./WebUntisLib/Lesson";
import Room from "./WebUntisLib/Room";
export let isValidLogin = false;
import { NoConnectionException } from "../../data/Exceptions/NoConnectionException";
import { RoomNotFoundException } from "../../data/Exceptions/RoomNotFoundException";

const {
    WEBUNTIS_SCHOOL,
    WEBUNTIS_USERNAME,
    WEBUNTIS_PASSWORD,
    WEBUNTIS_BASE_URL,
} = process.env;

const untis = new WebUntis(
    WEBUNTIS_SCHOOL,
    WEBUNTIS_USERNAME,
    WEBUNTIS_PASSWORD,
    WEBUNTIS_BASE_URL
);

const cache = new WebUntisCache();

export async function login() {
    await untis.login();
}

export async function getTimetableByRoomNumber(
    roomNum: string
): Promise<Lesson[]> {
    var table;
    if (/^([A-Z]|[a-z])/.test(roomNum)) roomNum = roomNum.substr(1);
    let date = new Date();
    let roomId = await getIDbyRoomNumber(roomNum);

    if (cache.timetableAvailable(roomId)) {
        const table = cache.getTimetable(roomId);
        return table;
    }
    /*
    try {
        table = await untis.getTimetableFor(date, roomId, 4);
    } catch (e) {
        if (e.message == "Current session is not valid") {
            await login();
            await getTimetableByRoomNumber(roomNum);
        } else if (e.message == "Server didn't returned any result.") {
            console.log(e);
            throw new RoomNotFoundException();
        } else {
            console.log(e.message);
            throw new NoConnectionException();
        }
    }*/
    try {
        let valid = untis.validateSession();
        if (valid) {
            table = await untis.getTimetableFor(date, roomId, 4);
        } else {
            await login();
            await getTimetableByRoomNumber(roomNum);
        }
    } catch (e) {
        console.log(e);
        if (e.message == "Server didn't returned any result.") {
            throw new RoomNotFoundException();
        } else {
            throw new NoConnectionException();
        }
    }
    cache.setTimetable(roomId, table);
    return table;
}

export async function getRoomList() {
    let rooms: Room[];
    if (cache.roomsAvailable) {
        rooms = cache.rooms;
    } else {
        try {
            let valid = untis.validateSession();
            if (valid) {
                rooms = await untis.getRooms();
                cache.rooms = rooms;
            } else {
                await login();
                await getRoomList();
            }
        } catch (e) {
            console.log(e);
            throw new NoConnectionException();
        }

        /* if (e.message == "Current Session is not valid") {
                let count = 0;
                while (count < 3) {
                    try {
                        await login();
                        break;
                    } catch {
                        count += 1;
                    }
                }
                if (count >= 3) {
                    throw new NoConnectionError();
                    return;
                }
                await getRoomList();
            } else {
                throw new NoConnectionError();
            }*/
    }
    return rooms;
}

export async function TryLogin() {
    try {
        await login();
        isValidLogin = true;
    } catch (e) {
        console.log(e);
    }
    return isValidLogin;
}

async function getIDbyRoomNumber(RoomNumber: string) {
    let return_id = -1;
    let rooms = await getRoomList();
    for (const room of rooms) {
        let longname = room.longName;
        let shortname = room.name;
        if (shortname.includes(RoomNumber)) {
            return room.id;
        }
        if (longname.includes(RoomNumber)) {
            return room.id;
        }
    }
}

function stringifyDate(date: number) {
    let dateStr = `${date}`;
    return `${dateStr.substr(6, 2)}.${dateStr.substr(4, 2)}.${dateStr.substr(
        0,
        4
    )}`;
}

function stringifyTime(time: number) {
    let timeStr = `${time}`;
    if (timeStr.length === 3) {
        timeStr = `0${timeStr}`;
    }
    return `${timeStr.substr(0, 2)}:${timeStr.substr(2, 2)}`;
}

async function testCode() {
    await login();
    let roomNum = "2406";
    let table = await getTimetableByRoomNumber(roomNum);
    let mappedTable = table
        .map((lesson) => {
            //console.log(lesson)
            return {
                class: lesson.kl.map((kl) => kl.name),
                room: lesson.ro.map((ro) => ro.name),
                teacher: lesson.te.map((te) => te.name),
                subject: lesson.su.map((su) => su.longname),
                date: stringifyDate(lesson.date),
                start: stringifyTime(lesson.startTime),
                end: stringifyTime(lesson.endTime),
            };
        })
        .sort((a, b) => a.start.localeCompare(b.start));
    console.table(mappedTable);
}

export async function getTimegrid() {
    let grid;
    let valid = await untis.validateSession();
    try {
        if (valid) {
            grid = untis.getTimegrid();
        } else {
            await login();
            grid = await getTimegrid();
        }
    } catch (e) {
        console.log(e);
        throw new NoConnectionException();
    }
    return grid;
    //let grid = untis.getTimegrid();
    /*try {
        grid = untis.getTimegrid();
    } catch (e) {
        console.error(e);
        if (e.message == "Current Session is not valid") {
            await login();
            await getTimegrid();
        } else {
            throw new NoConnectionError();
        }
    }*/
    //return grid;
}
