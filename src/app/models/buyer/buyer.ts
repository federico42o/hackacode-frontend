export interface Buyer {
    id:number,
    dni: string,
    name: string,
    surname: string,
    birthdate: string,
    lastVisit:string,
    age: number,
    banned?: boolean,
}
