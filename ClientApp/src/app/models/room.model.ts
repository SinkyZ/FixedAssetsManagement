import { Asset } from "./asset.model";

export class Room {
    id?: string;
    number: string = '';
    buildingId?: string;
    asset?: Asset[];
    userId?: string;
}