'use strict';

(function () {

  const PIN_MAIN_WIDTH = 65;

  const PIN_MAIN_HEIGHT = 65;

  const mapFiltersForm = document.querySelector(`.map__filters`);

  const mapFiltersFormFilters = Array.from(mapFiltersForm.children);

  const adForm = document.querySelector(`.ad-form`);

  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  mapFiltersFormFilters.forEach((value) => {
    value.setAttribute(`disabled`, `disabled`);
  });

  adFormFieldsets.forEach((value) => {
    value.setAttribute(`disabled`, `disabled`);
  });

  const adFormAdressInput = adForm.querySelector(`#address`);

  const adsMap = document.querySelector(`.map`);

  const mapPins = document.querySelector(`.map__pins`);

  const mapPinMain = mapPins.querySelector(`.map__pin--main`);

  adFormAdressInput.value = `${Math.round(parseInt(mapPinMain.style.getPropertyValue(`left`), 10) + PIN_MAIN_WIDTH / 2)}, ${Math.round(parseInt(mapPinMain.style.getPropertyValue(`top`), 10) + PIN_MAIN_HEIGHT / 2)}`;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  };

  window.main = {
    "PIN_MAIN_WIDTH": PIN_MAIN_WIDTH,
    "PIN_MAIN_HEIGHT": PIN_MAIN_HEIGHT,
    "mapFiltersFormFilters": mapFiltersFormFilters,
    "adForm": adForm,
    "adFormFieldsets": adFormFieldsets,
    "adFormAdressInput": adFormAdressInput,
    "adsMap": adsMap,
    "mapPins": mapPins,
    "mapPinMain": mapPinMain,
    "getRandomInt": getRandomInt
  };
})();
