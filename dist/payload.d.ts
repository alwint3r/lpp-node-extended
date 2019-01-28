/// <reference types="node" />
export interface IPSOTypesObject {
    [key: string]: string;
}
export declare const TYPES: IPSOTypesObject;
export interface IPSOTypeSizesObject {
    [key: string]: number;
}
export declare const SIZES: IPSOTypeSizesObject;
export interface IPSOObjectIDObject {
    [key: string]: number;
}
export declare const OBJECT_IDS: IPSOObjectIDObject;
export interface IPSOObjectIDToTypesMapping {
    [key: number]: string;
}
export declare const OBJECT_IDS_TO_TYPES_MAP: IPSOObjectIDToTypesMapping;
export declare function getFullIPSOObjectID(objectId: number): number;
export declare function getPayloadSizeFromObjectID(objectId: number): number | undefined;
export declare function getPayloadSize(type: string): number;
export declare function getObjectIdFromType(type: string): number;
export declare function createPayloadObject(objectId: number, data: any, channel: number): {
    data: any;
    channel: number;
    type: string;
    objectId: number;
    size: number;
};
export declare function bufferTo3BytesSignedInteger(buffer: Buffer): number;
