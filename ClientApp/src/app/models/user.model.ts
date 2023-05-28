import { Room } from "./room.model";

export class User {
    id?: string;
    email: string ='';
    firstName: string = '';
    lastName: string = '';
    role: string = '';
    phone: string = '';
    rooms?: Room[];
}