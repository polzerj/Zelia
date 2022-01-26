catch (e) {
    console.log(e);
    if (e.message == "Server didn't returned any result.") {
        throw new RoomNotFoundException();
    } else {
        throw new NoConnectionException();
    }
}