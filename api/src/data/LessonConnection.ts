import { Model, DataTypes } from "sequelize";

import LessonEntity from "./entities/LessonEntity";
import { Room } from "./RoomConnection";

import sequelize from "./DatabaseConnectionHandler";

export class Lesson extends Model<LessonEntity> implements LessonEntity {
  public Id!: number;
  public RoomId!: number;
  public CurrentClass!: string;
  public CurrentTeacher!: string;
  public CurrentSubject!: string;
  public StartLesson!: Date;
  public EndLesson!: Date;
}

Lesson.init(
  {
    Id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    RoomId: {
      type: DataTypes.NUMBER,
      references: {
        model: Room,
        key: "RoomId",
      },
    },
    CurrentClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurrentTeacher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CurrentSubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartLesson: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndLesson: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Lesson",
    sequelize,
  }
);

Room.hasMany(Lesson);
Lesson.belongsTo(Room, { foreignKey: "RoomId" });

export async function getLessons(roomNumber: string): Promise<Lesson[]> {
  const lesson = await Lesson.findAll({
    include: [
      {
        model: Room,
        required: true,
        where: { RoomNumber: roomNumber },
      },
    ],
  });
  return lesson;
}
