import RoomInfoModel from "../RoomInfoModel";

export function buildSummary(info: RoomInfoModel) {
    let summary = "";
    if (info.isWheelchairAccessible) summary += "🧑‍🦽 ";
    if (info.hasWater) summary += "🚰 ";
    if (info.projector === "Normal") summary += "📽 ";
    if (info.boards.some((board) => board === "pin")) summary += "📌 ";
    if (info.hasTeacherComputer) summary += "🧑‍💻 ";
    return summary;
}

export function createRoomInfoText(roomInfo: RoomInfoModel) {
    let infoStrings = [];
    if (roomInfo.hasWater) infoStrings.push(`Der Raum hat ein Waschbecken🚰`);
    if (roomInfo.isWheelchairAccessible)
        infoStrings.push(`Für Rollstuhlfahrer*innen geeignet 🧑‍🦽`);
    if (roomInfo.hasTeacherComputer)
        infoStrings.push(`1 Lehrer*innencomputer 🧑‍💻`);

    infoStrings.push(`${roomInfo.numberOfComputers} Computer 🖥`);

    appendBoardInfo(roomInfo.boards, "black", "eine Kalktafel", "Kalktafeln");
    appendBoardInfo(roomInfo.boards, "white", "ein Whiteboard", "Whiteboards");
    appendBoardInfo(roomInfo.boards, "smart", "ein Smartboard", "Smartboards");
    appendBoardInfo(roomInfo.boards, "pin", "eine Pinnwand 📌", "Pinnwände 📌");

    if (roomInfo.projector !== "None") {
        infoStrings.push(
            `Dieser Raum hat einen Projektor ${
                roomInfo.projector === "Smart" ? " mit Schreibfunktion" : ""
            }`
        );
    }
    if (roomInfo.projectorConnectors.length !== 0) {
        infoStrings.push(
            `Projektoranschlussmöglichkeiten: ${roomInfo.projectorConnectors.join(
                ", "
            )}`
        );
    }

    return infoStrings;

    function appendBoardInfo(
        boards: ("black" | "white" | "smart" | "pin")[],
        type: "black" | "white" | "smart" | "pin",
        singular: string,
        plural: string
    ) {
        const numOfBoards = boards.filter((board) => board === type).length;
        if (numOfBoards === 1) {
            infoStrings.push(`Dieser Raum hat ${singular}`);
        }
        if (numOfBoards > 1) {
            infoStrings.push(`Dieser Raum hat ${numOfBoards} ${plural}`);
        }
    }
}
