'use strict';

const User_Number = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];

const locationX;

const locationY;

const Type = [`palace`, `flat`, `house`, `bungalow`];

const Checkin = [`12:00`, `13:00`, `14:00`];

const Checkout = [`12:00`, `13:00`, `14:00`];

const Features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const Photos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

const createSimilarAdverts = (author, offer, location) => {
  let similarAdverts = [];
  for (let i = 0; i < 8; i++) {

    similarAdverts[i] = {
      "author": {
        "avatar": src = `../img/avatars/userUser_Number[i].png`
      },
      "offer": {
        "title": title,
        "address": locationX, locationY,
        "price": price,
        "type": Type,
        "rooms": rooms,
        "guests": guests,
        "checkin": Checkin,
        "checkout": Checkout,
        "features": Features,
        "description": description,
        "photos": Photos
      },
      "location": {
        "x": getRandomInt(0, max),
        "y": getRandomInt(130, 630)
      }
    };
  }
  return similarAdverts;
};

const adsMap = document.querySelector(`.map`);
adsMap.classList.remove(`map--faded`);

const adPinTemplate = document.querySelector(`#pin`).content;

const adPin = adPinTemplate.querySelector(`.map__pin`);

const renderAdPin = (advert) => {
  const adPinElement = adPin.cloneNode(true);

  adPinElement.style.style = `left: location.x + смещение по X + `px`; top: location.y + смещение по Y + `px`;`;
  adPinElement.querySelector(`img`).src = advert.author.avatar;
  adPinElement.querySelector(`img`).alt = advert.offer.title;

  return adPinElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < createSimilarAdverts(author, offer, location).length; i++) {
  fragment.appendChild(renderAdPin(createSimilarAdverts(author, offer, location)[i]));
}

const mapPins = document.querySelector(`.map__pins`);

mapPins.appendChild(fragment);
