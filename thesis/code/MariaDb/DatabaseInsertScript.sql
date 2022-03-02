USE Zelia;

INSERT INTO
    AdminUser (UserName, UserPassword)
VALUES
    ('Richard', '9c10edd8ec8f4204fe6e54954be2b62e5267bfefee622e9e133b9b233ec5c9b5'),
    ('Johannes', '9c10edd8ec8f4204fe6e54954be2b62e5267bfefee622e9e133b9b233ec5c9b5');

INSERT INTO 
    Room (AdminUserId, RoomNumber, LongName, RoomDescription, RoomType, IsWheelchairAccessable, HasWater, HasTeacherComputer, Projector, ProjectorConnectors, Boards, NumberOfComputers, NumberOfSeats)
VALUES
    (1, 'S1308', '5AHITN', 'Klassenraum der 5A/BHITN', 'Class', true, false, true, 'normal', 'HDMI, VGA', 'normal', 1, 26),
    (2, 'S2406', 'EDV-2406', 'EDV-Saal', 'EDV', true, true, true, 'smart', 'HDMI', 'Whiteboard', 1, 30);

INSERT INTO
    RoomReport (RoomId, AssignedAdminId, RoomNumber, ReportDescription, Email, ReportDateTime, ReportStatus, Hash, Verified)
VALUES
    (1, 1, 'S1308', 'Left Lamp', 'richard.panzer@edu.szu.at', '2021-10-21 14:24:00', 'In progress', 'asdfg', false),
    (2, 1, 'S2406', 'Right Lamp', 'johannes.polzer@edu.szu.at', '2021-10-21 15:58:00', 'Done', 'lkjhg', false);

INSERT INTO
    RoomReservation (RoomId, AssignedAdminId, RoomNumber, ReservationReason, Email, StartReservation, EndReservation, ReservationStatus, Hash, Verified)
VALUES
    (1, 1, 'S1308', 'Private Lesson Math', 'richard.panzer@edu.szu.at', '2021-10-21 15:35:00', '2021-10-21 16:25:00', 'In Progress', 'asdfg', false),
    (2, 1, 'S2406', 'Private Lesson German', 'johannes.polzer@edu.szu.at', '2021-10-21 16:25:00', '2021-10-21 17:15:00', 'approved', 'lkjhg', false);

INSERT INTO
    Lesson (RoomId, CurrentClass, CurrentTeacher, CurrentSubject, StartLesson, EndLesson)
VALUES
    (1, '2AHITN', 'KURZ', 'D', '2021-10-21 08:15:00', '2021-10-21 09:05:00'),
    (2, '2BHITN', 'SCPA', 'E', '2021-10-21 08:15:00', '2021-10-21 09:05:00');
