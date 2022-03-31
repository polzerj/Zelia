export default class RoomBookingModel {
    roomNumber: string;
    user: string;
    purpose: string;
    date: number;
    from: number;
    until: number;

    constructor(booking: RoomBookingModel) {
        this.roomNumber = booking.roomNumber;
        this.user = booking.user;
        this.purpose = booking.purpose;
        this.date = booking.date;
        this.from = booking.from;
        this.until = booking.until;
    }
}
