import Timegrid from "../timegrid/Timegrid";
import Lesson from "../timetable/Lesson";
import { stringifyDate, stringifyTime } from "../../util/date";

export function getTimetableViewOfTimegridAndTimetable(
    timetable: Lesson[],
    timegrid: Timegrid
): { [lessonNumber: string]: Lesson | null } {
    const sorted = timetableToSortedTimetable(timetable);
    let lessonPtr = 0;
    let data: { [lessonNumber: string]: Lesson | null } = {};
    let lessonNotFinished = false;
    for (const timeUnit of timegrid.timeUnits) {
        const currentLesson = sorted[lessonPtr];
        if (currentLesson) {
            if (
                currentLesson.startTime === timeUnit.startTime ||
                lessonNotFinished
            ) {
                data[timeUnit.name] = currentLesson;
            } else {
                data[timeUnit.name] = null;
            }
            if (currentLesson.endTime === timeUnit.endTime) {
                lessonPtr++;
                lessonNotFinished = false;
            } else {
                lessonNotFinished = true;
            }
        } else {
            data[timeUnit.name] = null;
        }
    }
    return data;
}

export function timetableToSortedTimetable(timetable: Lesson[]) {
    return timetable.sort((a, b) =>
        stringifyTime(a.startTime).localeCompare(stringifyTime(b.startTime))
    );
}

export function timetableToSimplifiedTimetable(timetable: Lesson[]) {
    return timetable.map(simplifyLesson);
}

export function simplifyLesson(lesson: Lesson) {
    return {
        class: lesson.kl.map((kl) => kl.name),
        room: lesson.ro.map((ro) => ro.name),
        teacher: lesson.te.map((te) => te.name),
        subjectLongName: lesson.su.map((su) => su.longname),
        subject: lesson.su.map((su) => su.name),
        date: stringifyDate(lesson.date),
        start: stringifyTime(lesson.startTime),
        end: stringifyTime(lesson.endTime),
    };
}
