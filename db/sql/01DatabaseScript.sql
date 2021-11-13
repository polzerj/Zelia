CREATE DATABASE Zelia;
USE Zelia;

CREATE TABLE AdminUser(
    Id INT NOT NULL AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    UserPassword VARCHAR(50) NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    PRIMARY KEY(Id)
);

CREATE TABLE Room(
    Id INT NOT NULL AUTO_INCREMENT,
    AdminUserId INT NOT NULL,
    RoomNumber CHAR(30) NOT NULL,
    LongName CHAR(30) NOT NULL,
    RoomDescription VARCHAR(50) NOT NULL,
    RoomType VARCHAR(50) NOT NULL,
    IsWheelchairAccessable BOOL NOT NULL,
    HasWater BOOL NOT NULL,
    HasTeacherComputer BOOL NOT NULL,
    Projector VARCHAR(50) NOT NULL,
    ProjectorConnectors VARCHAR(50) NOT NULL,
    Boards VARCHAR(50) NOT NULL,
    NumberOfComputers INT NOT NULL,
    NumberOfSeats INT NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    PRIMARY KEY(Id),
    CONSTRAINT `FK_Room_AdminUser`
        FOREIGN KEY (AdminUserId) REFERENCES AdminUser (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE 
);

CREATE TABLE RoomReservation(
    Id INT NOT NULL AUTO_INCREMENT,
    RoomId INT NOT NULL,
    AssignedAdminId INT NOT NULL,
    ReservationReason VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    StartReservation DATETIME NOT NULL,
    EndReservation DATETIME NOT NULL,
    ReservationStatus VARCHAR(50) NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    PRIMARY KEY(Id),
    CONSTRAINT `FK_RoomReservation_AdminUser`
        FOREIGN KEY (AssignedAdminId) REFERENCES AdminUser (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `FK_RoomReservation_Room`
        FOREIGN KEY (RoomId) REFERENCES Room (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE RoomReport(
    Id INT NOT NULL AUTO_INCREMENT,
    RoomId INT NOT NULL,
    AssignedAdminId INT NOT NULL,
    ReportDescription VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    ReportDateTime DATETIME NOT NULL,
    ReportStatus VARCHAR(50) NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    PRIMARY KEY(Id),
    CONSTRAINT `FK_RoomReport_AdminUser`
        FOREIGN KEY (AssignedAdminId) REFERENCES AdminUser (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `FK_RoomReport_Room`
        FOREIGN KEY (RoomId) REFERENCES Room (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Lesson(
    Id INT NOT NULL AUTO_INCREMENT,
    RoomId INT NOT NULL,
    CurrentClass VARCHAR(50) NOT NULL,
    CurrentTeacher VARCHAR(50) NOT NULL,
    CurrentSubject VARCHAR(50) NOT NULL,
    StartLesson DATETIME NOT NULL,
    EndLesson DATETIME NOT NULL,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    PRIMARY KEY(Id),
    CONSTRAINT `FK_Lesson_Room`
        FOREIGN KEY (RoomId) REFERENCES Room (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
