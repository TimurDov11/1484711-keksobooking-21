'use strict';

const PIN_MAIN_WIDTH = 65;

const PIN_MAIN_HEIGHT = 65;

const PIN_MAIN_POINT_HEIGHT = 22;

const PIN_WIDTH = 50;

const PIN_HEIGHT = 70;

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

const mapFiltersForm = document.querySelector(`.map__filters`);

const mapFiltersFormFilters = Array.from(mapFiltersForm.children);

const adForm = document.querySelector(`.ad-form`);

const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

const setAttributeDisabled = (values) => {
  values.forEach((value) => {
    value.setAttribute(`disabled`, `disabled`);
  });
};

setAttributeDisabled(mapFiltersFormFilters);

setAttributeDisabled(adFormFieldsets);

const adFormAdressInput = adForm.querySelector(`#address`);

const adsMap = document.querySelector(`.map`);

const mapPins = document.querySelector(`.map__pins`);

const mapPinMain = mapPins.querySelector(`.map__pin--main`);

adFormAdressInput.value = `${Math.round(parseInt(mapPinMain.style.getPropertyValue(`left`), 10) + PIN_MAIN_WIDTH / 2)}, ${Math.round(parseInt(mapPinMain.style.getPropertyValue(`top`), 10) + PIN_MAIN_HEIGHT / 2)}`;

const removeAttributeDisabled = (values) => {
  values.forEach((value) => {
    value.removeAttribute(`disabled`);
  });
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

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
      "type": TYPES[getRandomInt(0, TYPES.length)],
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

const adPinTemplate = document.querySelector(`#pin`).content.firstElementChild;

const renderAdPin = (advert) => {
  const adPinElement = adPinTemplate.cloneNode(true);

  adPinElement.style = `left: ${advert.location.x - PIN_WIDTH / 2}px; top: ${advert.location.y - PIN_HEIGHT}px;`;
  adPinElement.querySelector(`img`).src = advert.author.avatar;
  adPinElement.querySelector(`img`).alt = advert.offer.title;

  return adPinElement;
};

const fragment = document.createDocumentFragment();

const adverts = createSimilarAdverts();

const activatePage = () => {
  adsMap.classList.remove(`map--faded`);

  adForm.classList.remove(`ad-form--disabled`);

  removeAttributeDisabled(mapFiltersFormFilters);

  removeAttributeDisabled(adFormFieldsets);

  adFormAdressInput.value = `${Math.round(parseInt(mapPinMain.style.getPropertyValue(`left`), 10) + PIN_MAIN_WIDTH / 2)}, ${Math.round(parseInt(mapPinMain.style.getPropertyValue(`top`), 10) + PIN_MAIN_HEIGHT + PIN_MAIN_POINT_HEIGHT)}`;

  for (let i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderAdPin(adverts[i]));
  }

  mapPins.appendChild(fragment);

  mapPinMain.removeEventListener(`mousedown`, mapPinMainMousedownHandler);
  mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownEnterHandler);
};

const mapPinMainMousedownHandler = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};

mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);

const mapPinMainKeydownEnterHandler = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

mapPinMain.addEventListener(`keydown`, mapPinMainKeydownEnterHandler);

/* const adCardTemplate = document.querySelector(`#card`).content.firstElementChild;

const renderAdCard = (advert) => {
  const adCardElement = adCardTemplate.cloneNode(true);

  adCardElement.querySelector(`.popup__title`).textContent = advert.offer.title;
  adCardElement.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  adCardElement.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;

  const popupType = adCardElement.querySelector(`.popup__type`);

  switch (advert.offer.type) {
    case `palace`:
      popupType.textContent = `Дворец`;
      break;
    case `flat`:
      popupType.textContent = `Квартира`;
      break;
    case `house`:
      popupType.textContent = `Дом`;
      break;
    case `bungalow`:
      popupType.textContent = `Бунгало`;
      break;
  }

  adCardElement.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  adCardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;


  const featuresContainer = adCardElement.querySelector(`.popup__features`);
  featuresContainer.textContent = ``;

  advert.offer.features.forEach((value) => {
    const newFeature = document.createElement(`li`);
    newFeature.classList.add(`popup__feature`);
    newFeature.classList.add(`popup__feature--${value}`);

    featuresContainer.appendChild(newFeature);
  });

  adCardElement.querySelector(`.popup__description`).textContent = advert.offer.description;

  const popupPhoto = adCardElement.querySelector(`.popup__photos`).children[0];
  const newPopupPhoto = popupPhoto.cloneNode(true);
  adCardElement.querySelector(`.popup__photos`).removeChild(popupPhoto);

  for (let i = 0; i < advert.offer.photos.length; i++) {
    const newImagePopupPhoto = newPopupPhoto.cloneNode(true);
    newImagePopupPhoto.src = advert.offer.photos[i];
    adCardElement.querySelector(`.popup__photos`).appendChild(newImagePopupPhoto);
  }

  adCardElement.querySelector(`.popup__avatar`).src = advert.author.avatar;

  return adCardElement;
};

const adsFilter = adsMap.querySelector(`.map__filters-container`);

adsMap.insertBefore(renderAdCard(adverts[0]), adsFilter);*/

const roomNumberFilter = adForm.querySelector(`#room_number`);

const capacityFilter = adForm.querySelector(`#capacity`);

if (roomNumberFilter.value < capacityFilter.value) {
  roomNumberFilter.setCustomValidity(`Количество комнат должно быть больше или равно количеству гостей.`);
}

roomNumberFilter.addEventListener(`change`, (evt) => {
  const target = evt.target;
  const value = parseInt(capacityFilter.value, 10);
  target.setCustomValidity(``);
  capacityFilter.setCustomValidity(``);

  if (target.value < value && parseInt(target.value, 10) !== 100) {
    target.setCustomValidity(`Количество комнат должно быть больше или равно количеству гостей.`);
  } else if (parseInt(target.value, 10) === 100 && value !== 0) {
    target.setCustomValidity(`Не для гостей.`);
  } else if (parseInt(target.value, 10) !== 100 && value === 0) {
    target.setCustomValidity(`Не для гостей необходимо выбрать 100 комнат.`);
  }

  adForm.reportValidity();
});

capacityFilter.addEventListener(`change`, (evt) => {
  const target = evt.target;
  const value = parseInt(roomNumberFilter.value, 10);
  target.setCustomValidity(``);
  roomNumberFilter.setCustomValidity(``);

  if (target.value > value && parseInt(target.value, 10) !== 0 && value !== 100) {
    target.setCustomValidity(`Количество мест должно быть меньше или равно количеству комнат.`);
  } else if (parseInt(target.value, 10) !== 0 && value === 100) {
    target.setCustomValidity(`Количество мест не для 100 комнат.`);
  } else if (parseInt(target.value, 10) === 0 && value !== 100) {
    target.setCustomValidity(`Не для выбранного количества комнат.`);
  }

  adForm.reportValidity();
});
