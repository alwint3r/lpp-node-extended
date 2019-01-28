"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
exports.TYPES = {
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
exports.SIZES = {
    [exports.TYPES.IPSO_DIGITAL_INPUT]: 1,
    [exports.TYPES.IPSO_DIGITAL_OUTPUT]: 1,
    [exports.TYPES.IPSO_ANALOG_INPUT]: 2,
    [exports.TYPES.IPSO_ANALOG_OUTPUT]: 2,
    [exports.TYPES.IPSO_ILLUMINANCE_SENSOR]: 2,
    [exports.TYPES.IPSO_PRESENCE_SENSOR]: 1,
    [exports.TYPES.IPSO_TEMPERATURE_SENSOR]: 2,
    [exports.TYPES.IPSO_HUMIDITY_SENSOR]: 1,
    [exports.TYPES.IPSO_ACCELEROMETER]: 6,
    [exports.TYPES.IPSO_BAROMETER]: 2,
    [exports.TYPES.IPSO_GYROMETER]: 6,
    [exports.TYPES.IPSO_GPS_LOCATION]: 9,
    [exports.TYPES.IPSO_GPS_LOCATION_NONSTD]: 8,
    [exports.TYPES.IPSO_ALTITUDE]: 4,
    [exports.TYPES.IPSO_DIRECTION]: 2,
    [exports.TYPES.IPSO_STEP_COUNT]: 2,
    [exports.TYPES.IPSO_GENERIC_UINT16]: 2,
    [exports.TYPES.IPSO_GENERIC_INT16]: 2,
};
exports.OBJECT_IDS = {
    [exports.TYPES.IPSO_DIGITAL_INPUT]: 0,
    [exports.TYPES.IPSO_DIGITAL_OUTPUT]: 1,
    [exports.TYPES.IPSO_ANALOG_INPUT]: 2,
    [exports.TYPES.IPSO_ANALOG_OUTPUT]: 3,
    [exports.TYPES.IPSO_ILLUMINANCE_SENSOR]: 101,
    [exports.TYPES.IPSO_PRESENCE_SENSOR]: 102,
    [exports.TYPES.IPSO_TEMPERATURE_SENSOR]: 103,
    [exports.TYPES.IPSO_HUMIDITY_SENSOR]: 104,
    [exports.TYPES.IPSO_ACCELEROMETER]: 113,
    [exports.TYPES.IPSO_BAROMETER]: 115,
    [exports.TYPES.IPSO_GYROMETER]: 134,
    [exports.TYPES.IPSO_GPS_LOCATION]: 136,
    [exports.TYPES.IPSO_GPS_LOCATION_NONSTD]: 150,
    [exports.TYPES.IPSO_ALTITUDE]: 121,
    [exports.TYPES.IPSO_DIRECTION]: 132,
    [exports.TYPES.IPSO_STEP_COUNT]: 151,
    [exports.TYPES.IPSO_GENERIC_UINT16]: 152,
    [exports.TYPES.IPSO_GENERIC_INT16]: 153,
};
exports.OBJECT_IDS_TO_TYPES_MAP = _.invert(exports.OBJECT_IDS);
function getFullIPSOObjectID(objectId) {
    return 3200 + objectId;
}
exports.getFullIPSOObjectID = getFullIPSOObjectID;
function getPayloadSizeFromObjectID(objectId) {
    const type = exports.OBJECT_IDS_TO_TYPES_MAP[objectId];
    if (!type) {
        return undefined;
    }
    return exports.SIZES[type];
}
exports.getPayloadSizeFromObjectID = getPayloadSizeFromObjectID;
function getPayloadSize(type) {
    return exports.SIZES[type];
}
exports.getPayloadSize = getPayloadSize;
function getObjectIdFromType(type) {
    return exports.OBJECT_IDS[type];
}
exports.getObjectIdFromType = getObjectIdFromType;
function createPayloadObject(objectId, data, channel) {
    const type = exports.OBJECT_IDS_TO_TYPES_MAP[objectId];
    return {
        data,
        channel,
        type,
        objectId: objectId + 3200,
        size: exports.SIZES[type] || 0,
    };
}
exports.createPayloadObject = createPayloadObject;
function bufferTo3BytesSignedInteger(buffer) {
    if (buffer.length < 3) {
        return NaN;
    }
    if (buffer[0] & 0x80) {
        return Buffer.concat([Buffer.from([0xFF]), buffer]).readInt32BE(0);
    }
    return (buffer[0] << 16 | buffer[1] << 8 | buffer[2]);
}
exports.bufferTo3BytesSignedInteger = bufferTo3BytesSignedInteger;
