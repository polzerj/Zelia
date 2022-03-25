export async function getLessonByRoomNumber(roomNumber: string): Promise<LessonEntity[]> {
    let data: Lesson[];
    try {
      data = await getLessons(roomNumber);
    } catch (e) {
      throw new DatabaseNotAvailableException();
    }
    if (data.length === 0) {
      throw new RoomNotFoundException();
    }
    return data;
  }