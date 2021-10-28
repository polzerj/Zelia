import { getTimeGrid } from "../services/timegrid";
import Timegrid from "../services/timegrid/Timegrid";
import { getTimetableByRoomNumber } from "../services/timetable";
import Lesson from "../services/timetable/Lesson";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    container: HTMLDivElement;
    view: HTMLDivElement;
}

export default class Timetable extends Component<SearchElements> {
    private timegrid: Promise<Timegrid>;
    constructor() {
        super(
            "zelia-timetable",
            { container: "#ttContainer", view: "#ttView" },
            false
        );

        let attr = this.getAttribute("room-number");
        if (attr) this.loadLessons(attr);
        this.timegrid = getTimeGrid();
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

        for (let i = 0; i < 12; i++) {
            let lessonID = document.createElement("div");
            lessonID.textContent = i;
            lessonID.classList.add("lessonID");
            this.elements.view.append(lessonID);

            let subject = document.createElement("div");
            if (table[i]) {
                subject.classList.add("subject");
                subject.textContent = `${table[i].subject[0]} - ${
                    table[i].class[0]
                } - ${table[i].teacher.join(", ")} - start: ${table[i].start}`;
            }

            this.elements.view.append(subject);
        }

        if (table.length == 0) {
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
