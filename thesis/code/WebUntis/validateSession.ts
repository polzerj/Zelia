try {
    let valid = untis.validateSession();
    if (valid) {
        table = await untis.getTimetableFor(date, roomId, 4);
    } else {
        await login();
        await getTimetableByRoomNumber(roomNum);
    }
}
