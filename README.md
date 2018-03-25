Cayenne Low Power Payload for Node.js
=====================================

Unofficial library for dealing with Cayenne LPP in Node.js

## Features

* Decode LPP

## API

### decode(buffer: Buffer) -> Array\<Object>

Decode buffer which contains data in LPP format resulting an array of objects with the following structure:

```js
{
    data: 24.35,    // can be an array for multiple values
    channel: 1,     // channel number
    objectId: 3303, // IPSO object ID
    size: 2,        // size of data in bytes
}
```

Example:
```js
const lpp = require(`lpp-node`);

const payload = Buffer.from('018806765ff2960a0003e8', 'hex');

const decoded = lpp.decode(payload);

// decoded value:
// [ { data: [ 42.3519, -87.9094, 10 ],
//     channel: 1,
//     objectId: 3336,
//     type: 'IPSO_GPS_LOCATION',
//     size: 9 } ]
```

