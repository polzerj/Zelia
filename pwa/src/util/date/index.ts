export function stringifyDate(date: number) {
    let dateStr = `${date}`;
    return `${dateStr.substr(6, 2)}.${dateStr.substr(4, 2)}.${dateStr.substr(
        0,
        4
    )}`;
}

export function stringifyTime(time: number) {
    let timeStr = `${time}`;
    if (timeStr.length === 3) {
        timeStr = `0${timeStr}`;
    }
    return `${timeStr.substr(0, 2)}:${timeStr.substr(2, 2)}`;
}
