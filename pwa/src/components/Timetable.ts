import { getTimetableByRoomNumber } from "../services/timetable";
import Lesson from "../services/timetable/Lesson";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    container: HTMLDivElement;
}

export default class Timetable extends Component<SearchElements> {
    constructor() {
        super("zelia-timetable", { container: "#ttContainer" }, false);

        let attr = this.getAttribute("room-number");
        if (attr) this.loadLessons(attr);
    }

    set roomNumber(roomNumber: string) {
        this.setAttribute("room-number", roomNumber);

        this.loadLessons(roomNumber);
    }

    get roomNumber(): string {
        return this.getAttribute("room-number") ?? "";
    }

    private async loadLessons(roomNumber: string) {
        this.render(true);
        console.log("started to load lessons for " + roomNumber);

        try {
            let tt = await getTimetableByRoomNumber(roomNumber);

            this.createTimetableElements(tt);
        } catch (e: any) {
            this.createNoTimetableFoundElement(e);
        }
    }

    private createTimetableElements(lessons: Lesson[]) {
        let table = lessons
            .map((lesson) => {
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
            })
            .sort((a, b) => a.start.localeCompare(b.start));

        for (const lesson of table) {
            let item = document.createElement("p");
            item.textContent = `${lesson.subject[0]} - ${
                lesson.class[0]
            } - ${lesson.teacher.join(", ")} - start: ${lesson.start}`;
            this.elements.container.append(item);
        }

        if (lessons.length == 0) {
            let item = document.createElement("p");
            item.textContent = "No lessons";
            this.elements.container.append(item);
        }

        console.log(lessons);
    }
    private createNoTimetableFoundElement(e: Error) {
        logger.error(e);

        this.elements.container.append("No lesson data found");
        // when api server is running and invalid room number is fetched (1234) this function is called but "NO lessons data found" is removed from dom
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
