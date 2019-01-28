/// <reference types="node" />
export declare function decode(buffer: Buffer): {
    data: any;
    channel: number;
    type: string;
    objectId: number;
    size: number;
}[];
