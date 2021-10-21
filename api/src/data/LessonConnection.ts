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
import { Room } from "./RoomConnection";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

export class Lesson extends Model<LessonEntity>
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
            primaryKey: true,
            allowNull: false,
        },
        RoomId:
        {
            type: DataTypes.NUMBER,
            references:
            {
                model: Room,
                key: "RoomId"
            },
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

Room.hasMany(Lesson);
Lesson.belongsTo(Room, {foreignKey: 'RoomId'});

export async function getLessons(roomNumber: string) :Promise<Lesson[]> {
    const lesson = await Lesson.findAll({
        include: [{
            model: Room,
            required: true,
            where: {RoomNumber: roomNumber}
        }]
    })
    return lesson;
}
