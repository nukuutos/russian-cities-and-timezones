const fs = require('fs');
const data = require('./data');

class Format {
  static writeToFile(filename, data) {
    const dirpath = __dirname + '/result';
    if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath);
    fs.writeFileSync(`./result/${filename}.json`, JSON.stringify(data), 'utf8');
  }

  static runEveryMethod() {
    Format.toCityTimezoneObject(data);
    Format.getCityAndTimezone(data);
    Format.getShortData(data);
  }

  static toCityTimezoneObject() {
    // result = { ..., Москва: "Europe/Moscow", ... }

    const result = {};

    data.forEach(({ timezone, russianName }) => {
      result[russianName] = timezone;
    });

    Format.writeToFile('city-tz', result);
  }

  static getCityAndTimezone() {
    // result = [..., { city: "Москва", timezone: "Europe/Moscow" }, ...]

    const result = [];

    data.forEach(({ timezone, russianName: city }) => {
      result.push({ timezone, city });
    });

    Format.writeToFile('city-and-tz', result);
  }

  static getShortData() {
    // result = [..., { city(russian name), timezone, latitude, longitude }, ...]

    const result = [];

    data.forEach(({ timezone, russianName: city, lat: latitude, lng: longitude }) => {
      result.push({ timezone, city, latitude, longitude });
    });

    Format.writeToFile('short-data', result);
  }
}

module.exports = Format;
