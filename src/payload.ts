import * as _ from 'lodash';

export interface IPSOTypesObject {
  [key: string]: string,
}

export const TYPES: IPSOTypesObject = {
  IPSO_DIGITAL_INPUT: `IPSO_DIGITAL_INPUT`,
  IPSO_DIGITAL_OUTPUT: `IPSO_DIGITAL_OUTPUT`,
  IPSO_ANALOG_INPUT: `IPSO_ANALOG_INPUT`,
  IPSO_ANALOG_OUTPUT: `IPSO_ANALOG_OUTPUT`,
  IPSO_GENERIC_SENSOR: `IPSO_GENERIC_SENSOR`,
  IPSO_ILLUMINANCE_SENSOR: `IPSO_ILLUMINANCE_SENSOR`,
  IPSO_PRESENCE_SENSOR: `IPSO_PRESENCE_SENSOR`,
  IPSO_TEMPERATURE_SENSOR: `IPSO_TEMPERATURE_SENSOR`,
  IPSO_HUMIDITY_SENSOR: `IPSO_HUMIDITY_SENSOR`,
  IPSO_ACCELEROMETER: `IPSO_ACCELEROMETER`,
  IPSO_BAROMETER: `IPSO_BAROMETER`,
  IPSO_GYROMETER: `IPSO_GYROMETER`,
  IPSO_GPS_LOCATION: `IPSO_GPS_LOCATION`,
  IPSO_GPS_LOCATION_NONSTD: `IPSO_GPS_LOCATION_NONSTD`,
  IPSO_ALTITUDE: `IPSO_ALTITUDE`,
  IPSO_DIRECTION: `IPSO_DIRECTION`,
  IPSO_STEP_COUNT: `IPSO_STEP_COUNT`,
  IPSO_GENERIC_UINT16: `IPSO_GENERIC_UINT16`,
  IPSO_GENERIC_INT16: `IPSO_GENERIC_INT16`,
};

export interface IPSOTypeSizesObject {
  [key: string]: number,
}

export const SIZES: IPSOTypeSizesObject = {
  [TYPES.IPSO_DIGITAL_INPUT]: 1,
  [TYPES.IPSO_DIGITAL_OUTPUT]: 1,
  [TYPES.IPSO_ANALOG_INPUT]: 2,
  [TYPES.IPSO_ANALOG_OUTPUT]: 2,
  [TYPES.IPSO_ILLUMINANCE_SENSOR]: 2,
  [TYPES.IPSO_PRESENCE_SENSOR]: 1,
  [TYPES.IPSO_TEMPERATURE_SENSOR]: 2,
  [TYPES.IPSO_HUMIDITY_SENSOR]: 1,
  [TYPES.IPSO_ACCELEROMETER]: 6,
  [TYPES.IPSO_BAROMETER]: 2,
  [TYPES.IPSO_GYROMETER]: 6,
  [TYPES.IPSO_GPS_LOCATION]: 9,
  [TYPES.IPSO_GPS_LOCATION_NONSTD]: 8,
  [TYPES.IPSO_ALTITUDE]: 4,
  [TYPES.IPSO_DIRECTION]: 2,
  [TYPES.IPSO_STEP_COUNT]: 2,
  [TYPES.IPSO_GENERIC_UINT16]: 2,
  [TYPES.IPSO_GENERIC_INT16]: 2,
};

export interface IPSOObjectIDObject {
  [key: string]: number,
}

export const OBJECT_IDS: IPSOObjectIDObject = {
  [TYPES.IPSO_DIGITAL_INPUT]: 0,
  [TYPES.IPSO_DIGITAL_OUTPUT]: 1,
  [TYPES.IPSO_ANALOG_INPUT]: 2,
  [TYPES.IPSO_ANALOG_OUTPUT]: 3,
  [TYPES.IPSO_ILLUMINANCE_SENSOR]: 101,
  [TYPES.IPSO_PRESENCE_SENSOR]: 102,
  [TYPES.IPSO_TEMPERATURE_SENSOR]: 103,
  [TYPES.IPSO_HUMIDITY_SENSOR]: 104,
  [TYPES.IPSO_ACCELEROMETER]: 113,
  [TYPES.IPSO_BAROMETER]: 115,
  [TYPES.IPSO_GYROMETER]: 134,
  [TYPES.IPSO_GPS_LOCATION]: 136,
  [TYPES.IPSO_GPS_LOCATION_NONSTD]: 150,
  [TYPES.IPSO_ALTITUDE]: 121,
  [TYPES.IPSO_DIRECTION]: 132,
  [TYPES.IPSO_STEP_COUNT]: 151,
  [TYPES.IPSO_GENERIC_UINT16]: 152,
  [TYPES.IPSO_GENERIC_INT16]: 153,
};

export interface IPSOObjectIDToTypesMapping {
  [key: number]: string,
}


export const OBJECT_IDS_TO_TYPES_MAP: IPSOObjectIDToTypesMapping = _.invert(OBJECT_IDS);

export function getFullIPSOObjectID(objectId: number): number {
  return 3200 + objectId;
}

export function getPayloadSizeFromObjectID(objectId: number): number | undefined {
  const type = OBJECT_IDS_TO_TYPES_MAP[objectId];
  if (!type) {
    return undefined;
  }

  return SIZES[type];
}

export function getPayloadSize(type: string) {
  return SIZES[type];
}

export function getObjectIdFromType(type: string) {
  return OBJECT_IDS[type];
}

export function createPayloadObject(objectId: number, data: any, channel: number) {
  const type = OBJECT_IDS_TO_TYPES_MAP[objectId];
 
  return {
    data,
    channel,
    type,
    objectId: objectId + 3200,
    size: SIZES[type] || 0,
  };
}

export function bufferTo3BytesSignedInteger(buffer: Buffer) {
  if (buffer.length < 3) {
    return NaN;
  }

  if (buffer[0] & 0x80) {
    return Buffer.concat([Buffer.from([0xFF]), buffer]).readInt32BE(0);
  }

  return (buffer[0] << 16 | buffer[1] << 8 | buffer[2]);
}
