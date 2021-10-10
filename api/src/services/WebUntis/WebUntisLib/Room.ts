export default interface Room {
    id: number;
    name: string;
    longName: string;
    alternateName: string | "";
    active: boolean;
    foreColor: string;
    backColor: string;
}
