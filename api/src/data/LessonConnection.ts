import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from "sequelize";

import LessonEntity from "./entities/LessonEntity";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class Lesson extends Model<LessonEntity>
    implements LessonEntity{
        public Id!: Number;
        public RoomId!: Number;
        public CurrentClass!: string;
        public CurrentTeacher!: string;
        public CurrentSubject!: string;
        public StartLesson!: Date;
        public EndLesson!: Date;
    }

Lesson.init(
    {
        Id:
        {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            allowNull: false,
        },
        RoomId:
        {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        CurrentClass:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CurrentTeacher:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CurrentSubject:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        StartLesson:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndLesson:
        {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: "Lesson",
        sequelize,
    }
);

export async function getLessons(roomNumber: string) :Promise<LessonEntity[]> {
    const lesson = await Lesson.findAll({where: {}})   //To implement
    console.log(lesson);
    return lesson;
}