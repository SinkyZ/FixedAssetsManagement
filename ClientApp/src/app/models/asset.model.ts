import { Guid } from 'guid-typescript';

export class Asset{
    id?: string;
    name: string = '';
    assetCode?: Guid;
}