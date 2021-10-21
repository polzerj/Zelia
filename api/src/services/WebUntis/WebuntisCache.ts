import Lesson from "./WebUntisLib/Lesson";
import Room from "./WebUntisLib/Room";

interface TimetableCache {
    roomId: number;
    timestamp: number;
    timetable: Lesson[];
}
export default class WebUntisCache {
    private static timetableTimer = 60 * 1000;
    private static roomTimer = 60 * 60 * 1000;
    private _rooms: { timestamp: number; rooms: Room[] } = {
        timestamp: 0,
        rooms: [],
    };
    private _timetables: TimetableCache[] = [];

    constructor() {
        this.cleanupCache = this.cleanupCache.bind(this);
        setTimeout(this.cleanupCache, 60 * 1000);
    }

    timetableAvailable(roomId: number) {
        return (
            this._timetables.find((timetable) => timetable.roomId === roomId) !=
            undefined
        );
    }
    getTimetable(roomId: number) {
        return (
            this._timetables.find((timetable) => timetable.roomId === roomId)
                ?.timetable ?? []
        );
    }
    setTimetable(roomId: number, timetable: Lesson[]) {
        this._timetables.push({ timetable, roomId, timestamp: Date.now() });
    }

    get roomsAvailable() {
        return this._rooms.rooms.length > 0;
    }

    get rooms() {
        return this._rooms.rooms;
    }
    set rooms(rooms: Room[]) {
        this._rooms = { rooms, timestamp: Date.now() };
    }

    cleanupCache() {
        const now = Date.now();

        if (now - this._rooms.timestamp > WebUntisCache.roomTimer) {
            this._rooms.rooms = [];
        }
        this._timetables = this._timetables.filter(
            (timetable) =>
                now - timetable.timestamp < WebUntisCache.timetableTimer
        );
    }
}
