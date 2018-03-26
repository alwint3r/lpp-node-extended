'use strict';

const _ = require(`lodash`);

const TYPES = {
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
};

const SIZES = {
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
};

const OBJECT_IDS = {
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
};

const OBJECT_IDS_TO_TYPES_MAP = _.invert(OBJECT_IDS);

function getFullIPSOObjectID(objectId) {
  return 3200 + objectId;
}

function getPayloadSizeFromObjectID(objectId) {
  const type = OBJECT_IDS_TO_TYPES_MAP[objectId];
  if (!type) {
    return undefined;
  }

  return SIZES[type];
}

function getPayloadSize(type) {
  return SIZES[type];
}

function getObjectIdFromType(type) {
  return OBJECT_IDS[type];
}

function createPayloadObject(objectId, data, channel) {
  const type = OBJECT_IDS_TO_TYPES_MAP[objectId];
 
  return {
    data,
    channel,
    type,
    objectId: objectId + 3200,
    size: SIZES[type] || 0,
  };
}

function bufferTo3BytesSignedInteger(buffer) {
  if (buffer.length < 3) {
    return NaN;
  }

  if (buffer[0] & 0x80) {
    return Buffer.concat([Buffer.from([0xFF]), buffer]).readInt32BE();
  }

  return (buffer[0] << 16 | buffer[1] << 8 | buffer[2]);
}

module.exports = {
  SIZES,
  OBJECT_IDS,
  OBJECT_IDS_TO_TYPES_MAP,
  TYPES,

  getPayloadSize,
  getObjectIdFromType,
  getFullIPSOObjectID,
  getPayloadSizeFromObjectID,
  createPayloadObject,
  bufferTo3BytesSignedInteger
}
