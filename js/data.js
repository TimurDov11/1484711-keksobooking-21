'use strict';

(function () {

  const TYPES = [`palace`, `flat`, `house`, `bungalow`];

  const CHECKIN = [`12:00`, `13:00`, `14:00`];

  const CHECKOUT = [`12:00`, `13:00`, `14:00`];

  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const TITLES = [
    `Title1`,
    `Title2`,
    `Title3`
  ];

  const DESCRIPTIONS = [
    `Description1`,
    `Description2`,
    `Description3`
  ];

  const PRICE_MIN = 500;
  const PRICE_MAX = 200000;

  const createSimilar = (num) => {
    const features = [];
    let temp = FEATURES.slice();
    let size = window.main.getRandomInt(0, FEATURES.length);

    for (let i = 0; i < size; i++) {
      const index = window.main.getRandomInt(0, temp.length);
      features.push(temp[index]);
      temp.splice(index, 1);
    }

    const photos = [];
    temp = PHOTOS.slice();
    size = window.main.getRandomInt(0, PHOTOS.length);

    for (let i = 0; i <= size; i++) {
      const index = window.main.getRandomInt(0, temp.length);
      photos.push(temp[index]);
      temp.splice(index, 1);
    }

    const similarAdvert = {
      "author": {
        "avatar": `./img/avatars/user0${num}.png`
      },
      "offer": {
        "title": TITLES[window.main.getRandomInt(0, TITLES.length)],
        "address": `${window.main.getRandomInt(0, 1000)}, ${window.main.getRandomInt(0, 1000)}`,
        "price": window.main.getRandomInt(PRICE_MIN, PRICE_MAX),
        "type": TYPES[window.main.getRandomInt(0, TYPES.length)],
        "rooms": window.main.getRandomInt(1, 4),
        "guests": window.main.getRandomInt(2, 12),
        "checkin": CHECKIN[window.main.getRandomInt(0, CHECKIN.length)],
        "checkout": CHECKOUT[window.main.getRandomInt(0, CHECKOUT.length)],
        "features": features,
        "description": DESCRIPTIONS[window.main.getRandomInt(0, DESCRIPTIONS.length)],
        "photos": photos
      },
      "location": {
        "x": window.main.getRandomInt(0, 1200),
        "y": window.main.getRandomInt(130, 630)
      }
    };
    return similarAdvert;
  };

  const createSimilarAdverts = () => {
    let similarAdverts = [];

    for (let i = 1; i < 9; i++) {
      similarAdverts.push(createSimilar(i));
    }
    return similarAdverts;
  };

  window.data = {
    "TYPES": TYPES,
    "createSimilarAdverts": createSimilarAdverts
  };
})();
