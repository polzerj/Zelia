import RoomInfoModel from "../RoomInfoModel";

export function buildSummary(info: RoomInfoModel) {
    let summary = "";
    if (info.isWheelchairAccessible) summary += "🧑‍🦽";
    if (info.hasWater) summary += "🚰";
    if (info.projector === "Normal") summary += "📽";
    if (info.boards.some((board) => board === "pin")) summary += "📌";
    if (info.hasTeacherComputer) summary += "🧑‍💻";
    return summary;
}

export function createRoomInfoText(roomInfo: RoomInfoModel) {
    let infoStrings = [];
    if (roomInfo.hasTeacherComputer) infoStrings.push(`Raum hat Wasser🚰`);
    if (roomInfo.isWheelchairAccessible) infoStrings.push(`Raum ist für Rollstuhlfahrer*innen geeignet 🧑‍🦽`);
    if (roomInfo.hasTeacherComputer) infoStrings.push(`Dieser Raum hat einen Lehrer PC 🧑‍💻`);

    infoStrings.push(`Anzahl an Computern: ${roomInfo.numberOfComputers} 🖥`);

    appendBoardInfo(roomInfo.boards, "black", "eine Kalktafel", "Kalktafeln");
    appendBoardInfo(roomInfo.boards, "white", "ein Whiteboard", "Whiteboards");
    appendBoardInfo(roomInfo.boards, "smart", "ein Smartboard", "Smartboards");
    appendBoardInfo(roomInfo.boards, "pin", "eine Pinnwand 📌", "Pinnwände 📌");

    if (roomInfo.projector !== "None") {
        infoStrings.push(`Dieser Raum hat einen Projektor ${roomInfo.projector === "Smart" ? " mit Schreibfunktion" : ""}`);
    }
    if (roomInfo.projectorConnectors.length !== 0) {
        infoStrings.push(`Anschlussmöglichkeiten an den Projektor: ${roomInfo.projectorConnectors.join(", ")}`);
    }

    return infoStrings;

    function appendBoardInfo(boards: ("black" | "white" | "smart" | "pin")[], type: "black" | "white" | "smart" | "pin", singular: string, plural: string) {
        const numOfBoards = boards.filter((board) => board === type).length;
        if (numOfBoards === 1) {
            infoStrings.push(`Dieser Raum hat ${singular}`);
        }
        if (numOfBoards > 1) {
            infoStrings.push(`Dieser Raum hat ${numOfBoards} ${plural}`);
        }
    }
}
