'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const TYPE = [`palace`, `flat`, `house`, `bungalow`];

const CHECKIN = [`12:00`, `13:00`, `14:00`];

const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

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
  let size = getRandomInt(0, FEATURES.length);

  for (let i = 0; i < size; i++) {
    const index = getRandomInt(0, temp.length);
    features.push(temp[index]);
    temp.splice(index, 1);
  }

  const photos = [];
  temp = PHOTOS.slice();
  size = getRandomInt(0, PHOTOS.length);

  for (let i = 0; i <= size; i++) {
    const index = getRandomInt(0, temp.length);
    photos.push(temp[index]);
    temp.splice(index, 1);
  }

  const similarAdvert = {
    "author": {
      "avatar": `./img/avatars/user0${num}.png`
    },
    "offer": {
      "title": TITLES[getRandomInt(0, TITLES.length)],
      "address": `${getRandomInt(0, 1000)}, ${getRandomInt(0, 1000)}`,
      "price": getRandomInt(PRICE_MIN, PRICE_MAX),
      "type": TYPE[getRandomInt(0, TYPE.length)],
      "rooms": getRandomInt(1, 4),
      "guests": getRandomInt(2, 12),
      "checkin": CHECKIN[getRandomInt(0, CHECKIN.length)],
      "checkout": CHECKOUT[getRandomInt(0, CHECKOUT.length)],
      "features": features,
      "description": DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)],
      "photos": photos
    },
    "location": {
      "x": getRandomInt(0, 1200),
      "y": getRandomInt(130, 630)
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

const adsMap = document.querySelector(`.map`);
adsMap.classList.remove(`map--faded`);

const adPinTemplate = document.querySelector(`#pin`).content.firstElementChild;

const renderAdPin = (advert) => {
  const adPinElement = adPinTemplate.cloneNode(true);

  adPinElement.style = `left: ${advert.location.x - PIN_WIDTH/2}px; top: ${advert.location.y - PIN_HEIGHT}px;`;
  adPinElement.querySelector(`img`).src = advert.author.avatar;
  adPinElement.querySelector(`img`).alt = advert.offer.title;

  return adPinElement;
};

const fragment = document.createDocumentFragment();
const adverts = createSimilarAdverts();
for (let i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderAdPin(adverts[i]));
}

const mapPins = document.querySelector(`.map__pins`);

mapPins.appendChild(fragment);
