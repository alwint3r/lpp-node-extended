'use strict';

const _ = require(`lodash`);
const payload = require(`./payload`);

function decode(buffer) {
  if (buffer.length < 3) {
    return [];
  }

  const result = [];

  let cursor = 0;
  while (cursor < buffer.length) {
    const channel = buffer[cursor++];
    const objectId = buffer[cursor++];

    if (_.isUndefined(channel) || _.isUndefined(objectId)) {
      return result;
    }

    const type = payload.OBJECT_IDS_TO_TYPES_MAP[objectId];
    if (!type) {
      return result;
    }

    const length = payload.getPayloadSizeFromObjectID(objectId);

    let data;
    const slice = buffer.slice(cursor, cursor + length);

    switch (type) {
      case payload.TYPES.IPSO_DIGITAL_INPUT:
      case payload.TYPES.IPSO_DIGITAL_OUTPUT:
        data = slice.readUInt8();
        break;
      case payload.TYPES.IPSO_ANALOG_OUTPUT:
      case payload.TYPES.IPSO_ANALOG_INPUT:
        data = slice.readInt16BE() / 100.0;
        break;
      case payload.TYPES.IPSO_ILLUMINANCE_SENSOR:
        data = slice.readInt16BE();
        break;
      case payload.TYPES.IPSO_TEMPERATURE_SENSOR:
        data = slice.readInt16BE() / 10.0;
        break;
      case payload.TYPES.IPSO_HUMIDITY_SENSOR:
        data = slice.readInt8() / 50.0;
        break;
      case payload.TYPES.IPSO_ACCELEROMETER:
        data = [
          slice.readInt16BE(0) / 1000.0,
          slice.readInt16BE(2) / 1000.0,
          slice.readInt16BE(4) / 1000.0,
        ];
        break;
      case payload.TYPES.IPSO_BAROMETER:
        data = slice.readInt16BE() / 10.0;
        break;
      case payload.TYPES.IPSO_GYROMETER:
        data = [
          slice.readInt16BE(0) / 100.0,
          slice.readInt16BE(2) / 100.0,
          slice.readInt16BE(4) / 100.0,
        ];
        break;
      case payload.TYPES.IPSO_GPS_LOCATION:
        data = [
          payload.bufferTo3BytesSignedInteger(slice.slice(0, 3)) / 10000.0,
          payload.bufferTo3BytesSignedInteger(slice.slice(3, 6)) / 10000.0,
          payload.bufferTo3BytesSignedInteger(slice.slice(6, 9)) / 100,
        ];
        break;
      case payload.TYPES.IPSO_GPS_LOCATION_NONSTD:
        data = [
          slice.readInt32BE(0) / (1e7 * 1.0),
          slice.readInt32BE(4) / (1e7 * 1.0),
        ];
        break;
      case payload.TYPES.IPSO_ALTITUDE:
        data = slice.readInt32BE() / 100.0;
        break;
    }

    cursor += length;

    result.push(payload.createPayloadObject(objectId, data, channel));
  }

  return result;
}

module.exports = {
  decode,
};
