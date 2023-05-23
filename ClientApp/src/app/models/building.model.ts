import { Room } from "./room.model";

export class Building {
    id?: string;
    name: string = '';
    address: string = '';
    companyId?: string;
    room?: Room[]
}