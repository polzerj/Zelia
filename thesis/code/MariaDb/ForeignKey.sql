CONSTRAINT `FK_RoomReservation_Room`
        FOREIGN KEY (RoomId) REFERENCES Room (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE