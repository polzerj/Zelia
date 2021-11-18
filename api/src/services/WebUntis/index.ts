import WebUntisCache from "./WebuntisCache";
import WebUntis from "./WebUntisLib";
import Lesson from "./WebUntisLib/Lesson";
import Room from "./WebUntisLib/Room";
export let isValidLogin = false;

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

const NoConnError = new Error("Unable to connect to WebUntis");

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
    try {
        table = await untis.getTimetableFor(date, roomId, 4);
    } catch (e) {
        if (e.message == "Current session is not valid") {
            await login();
            await getTimetableByRoomNumber(roomNum);
        } else if (e.message == "Server didn't returned any result.") {
            console.log(e);
            throw new Error("Room not found");
        } else {
            console.log(e.message);
            throw NoConnError;
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
            rooms = await untis.getRooms();
            cache.rooms = rooms;
        } catch (e) {
            if (e.message == "Current session is not valid") {
                login();
                await getRoomList();
            } else {
                throw NoConnError;
            }
        }
    }
    return rooms;
}

export async function TryLogin() {
    try {
        login();
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
    try {
        grid = untis.getTimegrid();
    } catch (e) {
        if (e.message == "Current session is not valid") {
            await login();
            getTimegrid();
        } else {
            throw NoConnError;
        }
    }
    return grid;
}

//testCode();
