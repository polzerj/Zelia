import ShortData from "./ShortData";

export default interface Lesson {
    id: number;
    date: number;
    startTime: number;
    endTime: number;
    kl: ShortData[];
    te: ShortData[];
    su: ShortData[];
    ro: ShortData[];
    lstext?: string;
    lsnumber: number;
    activityType?: "Unterricht" | string;
    code?: "cancelled" | "irregular";
    info?: string;
    substText?: string;
    statflags?: string;
    sg?: string;
    bkRemark?: string;
    bkText?: string;
}
