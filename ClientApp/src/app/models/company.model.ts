import { Building } from "./building.model";

export class Company {
    id?: string;
    name: string = '';
    buildings?: Building[];
}