import ColorEntity from "./ColorEntity";

export default interface LsEntity {
    ls?: ColorEntity | null;
    oh?: ColorEntity | null;
    sb?: ColorEntity | null;
    bs?: ColorEntity | null;
    ex?: ColorEntity | null;
}
