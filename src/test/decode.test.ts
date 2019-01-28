const lpp = require(`../`);

test(`decode temperature data`, () => {
  const decoded = lpp.decode(Buffer.from(`03670110`, `hex`));
  const data = decoded[0];

  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(27.2);
  expect(data.type).toEqual(`IPSO_TEMPERATURE_SENSOR`);
  expect(data.size).toEqual(2);
  expect(data.channel).toEqual(3);
});

test(`decode multiple temperature data`, () => {
  const decoded = lpp.decode(Buffer.from(`03670110056700FF`, `hex`));
  let data = decoded[0];

  expect(decoded.length).toEqual(2);
  expect(data.data).toEqual(27.2);
  expect(data.type).toEqual(`IPSO_TEMPERATURE_SENSOR`);
  expect(data.size).toEqual(2);
  expect(data.channel).toEqual(3);

  data = decoded[1];
  expect(data.data).toEqual(25.5);
  expect(data.type).toEqual(`IPSO_TEMPERATURE_SENSOR`);
  expect(data.size).toEqual(2);
  expect(data.channel).toEqual(5);
});

test(`decode accelerometer data`, () => {
  const decoded = lpp.decode(Buffer.from(`067104D2FB2E0000`, `hex`));
  const data = decoded[0];

  const expectedData = [
    1.234,
    -1.234,
    0
  ];

  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(expect.arrayContaining(expectedData));
  expect(data.type).toEqual(`IPSO_ACCELEROMETER`);
  expect(data.size).toEqual(6);
  expect(data.channel).toEqual(6);
});

test(`decode GPS data`, () => {
  const decoded = lpp.decode(Buffer.from(`018806765ff2960a0003e8`, `hex`));
  const data = decoded[0];

  const expectedData = [
    42.3519,
    -87.9094,
    10,
  ];

  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(expect.arrayContaining(expectedData));
  expect(data.type).toEqual(`IPSO_GPS_LOCATION`);
  expect(data.size).toEqual(9);
  expect(data.channel).toEqual(1);
});


test(`decode GPS data with non-standard object ID`, () => {
  const decoded = lpp.decode(Buffer.from(`0196fbe7ed0c401f6cfc`, `hex`));
  const data = decoded[0];

  const expectedData = [
    -6.868658,
    107.580134
  ];
  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(expect.arrayContaining(expectedData));
  expect(data.type).toEqual(`IPSO_GPS_LOCATION_NONSTD`);
  expect(data.size).toEqual(8);
  expect(data.channel).toEqual(1);
});

test(`decode altitude data from IPSO extension pack`, () => {
  const decoded = lpp.decode(Buffer.from(`017900015702`, `hex`));
  const data = decoded[0];

  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(878.1);
  expect(data.type).toEqual(`IPSO_ALTITUDE`);
  expect(data.size).toEqual(4);
  expect(data.channel).toEqual(1);
});

test(`decode altitude data from IPSO extension pack`, () => {
  const decoded = lpp.decode(Buffer.from(`0184492c`, `hex`));
  const data = decoded[0];

  expect(decoded.length).toEqual(1);
  expect(data.data).toEqual(187.32);
  expect(data.type).toEqual(`IPSO_DIRECTION`);
  expect(data.size).toEqual(2);
  expect(data.channel).toEqual(1);
});
