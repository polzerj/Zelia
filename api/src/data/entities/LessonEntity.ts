export default interface LessonEntity
{
    Id: Number;
    RoomId: Number;
    CurrentClass: string;
    CurrentTeacher: string;
    CurrentSubject: string;
    LessonDate: Date;
    StartLesson: Date;
    EndLesson: Date;
}
