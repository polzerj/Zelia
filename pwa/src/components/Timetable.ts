import { getTimetableViewOfTimegridAndTimetable, simplifyLesson, timetableToSortedTimetable } from "../services/mapper/timetable";
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
    private timegrid: Promise<Timegrid[]>;
    constructor() {
        super("zelia-timetable", {
            queries: { container: "#ttContainer", view: "#ttView" },
            autoRender: false,
        });

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

    private async createTimetableElements(lessons: Lesson[]) {
        let table = timetableToSortedTimetable(lessons);
        const grid = await this.timegrid;
        const griddedTimeTable = getTimetableViewOfTimegridAndTimetable(table, grid[0]);
        const lessonNames = Object.keys(griddedTimeTable);

        for (let i = 0; i < lessonNames.length; i++) {
            const lesson = griddedTimeTable[lessonNames[i]];
            if (this.elements.view.children.length == 0 && !lesson) continue;

            let lessonID = document.createElement("div");
            lessonID.textContent = lessonNames[i];
            lessonID.classList.add("lessonID");

            this.elements.view.append(lessonID);

            let subject = document.createElement("div");
            if (lesson) {
                const simplifiedLesson = simplifyLesson(lesson);
                subject.classList.add("subject");
                subject.textContent = `${simplifiedLesson.subject[0]} - ${simplifiedLesson.class[0]} - ${simplifiedLesson.teacher.join(
                    ", "
                )}`;
            }
            this.elements.view.append(subject);
        }

        if (table.length == 0) {
            let item = document.createElement("p");
            item.textContent = "No lessons";
            this.elements.container.append(item);
        }
    }

    private createNoTimetableFoundElement(e: Error) {
        logger.error(e);

        this.elements.container.append("No lesson data found");
        // when api server is running and invalid room number is fetched (1234) this function is called but "NO lessons data found" is removed from dom
    }
}
