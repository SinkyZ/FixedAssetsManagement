import { Asset } from "./asset.model";

export class Category {
    id?: string;
    name: string = '';
    assets?: Asset[];
}