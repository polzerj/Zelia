export default interface LessonEntity
{
    Id: number;
    RoomId: number;
    CurrentClass: string;
    CurrentTeacher: string;
    CurrentSubject: string;
    StartLesson: Date;
    EndLesson: Date;
}
