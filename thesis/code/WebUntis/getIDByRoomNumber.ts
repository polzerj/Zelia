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