import { Room } from "./room.model";

export class User {
    id?: string;
    email: string ='';
    firstName: string = '';
    lastName: string = '';
    password?: string;
    role: string = '';
    phone: string = '';
    rooms?: Room[];
}