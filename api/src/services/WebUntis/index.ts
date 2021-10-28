import WebUntisCache from "./WebuntisCache";
import WebUntis from "./WebUntisLib";
import Lesson from "./WebUntisLib/Lesson";
import Room from "./WebUntisLib/Room";

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
    let date = new Date();
    let roomId = await getIDbyRoomNumber(roomNum);

    if (cache.timetableAvailable(roomId)) {
        const table = cache.getTimetable(roomId);
        return table;
    }
    let table = await untis.getTimetableFor(date, roomId, 4);
    cache.setTimetable(roomId, table);
    return table;
}

export async function getRoomList() {
    let rooms: Room[];
    if (cache.roomsAvailable) {
        rooms = cache.rooms;
    } else {
        rooms = await untis.getRooms();
        cache.rooms = rooms;
    }
    return rooms;
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

//testCode();
