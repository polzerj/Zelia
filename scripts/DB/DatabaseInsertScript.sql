INSERT INTO 
    Room (AdminUserId, RoomNumber, LongName, IsWheelchairAccessable, HasABeamer, HasWater, HasTeacherComputer, NumberOfComputers, Seatplaces)
VALUES
    (1, '2223', '2AHITN', true, true, false, true, 1, 26),
    (2, '2224', '2BHITN', true, false, true, true, 1, 30);

INSERT INTO
    AdminUser (UserName, UserPassword)
VALUES
    ('Richard', 'Blabla'),
    ('Johannes', 'Blabla');

INSERT INTO
    RoomReport (RoomId, AssignedAdminId, ReportDescription, Email, ReportDateTime, ReportStatus)
VALUES
    (1, 1, 'Left Lamp', 'richard.panzer@edu.szu.at', '2021-10-21 14:24:00', 'In progress'),
    (2, 1, 'Right Lamp', 'johannes.polzer@edu.szu.at', '2021-10-21 15:58:00', 'Done');

INSERT INTO
    RoomReservation (RoomId, AssignedAdminId, ReservationReason, Email, StartReservation, EndReservation, ReservationStatus)
VALUES
    (1, 1, 'Private Lesson Math', 'richard.panzer@edu.szu.at', '2021-10-21 15:35:00', '2021-10-21 16:25:00', 'In Progress'),
    (2, 1, 'Private Lesson German', 'johannes.polzer@edu.szu.at', '2021-10-21 16:25:00', '2021-10-21 17:15:00', 'approved');

INSERT INTO
    Lesson (RoomId, CurrentClass, CurrentTeacher, CurrentSubject, StartLesson, EndLesson)
VALUES
    (1, '2AHITN', 'KURZ', 'D', '2021-10-21 08:15:00', '2021-10-21 09:05:00'),
    (2, '2BHITN', 'SCPA', 'E', '2021-10-21 08:15:00', '2021-10-21 09:05:00');