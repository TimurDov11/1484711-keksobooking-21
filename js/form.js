'use strict';

(function () {

  const PRICE_PER_NIGHT = [`10000`, `1000`, `5000`, `0`];

  const roomNumberFilter = window.main.adForm.querySelector(`#room_number`);

  const capacityFilter = window.main.adForm.querySelector(`#capacity`);

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

    window.main.adForm.reportValidity();
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

    window.main.adForm.reportValidity();
  });

  const housingType = window.main.adForm.querySelector(`#type`);

  const pricePerNight = window.main.adForm.querySelector(`#price`);

  const addHousingTypeChangeHandler = (type, price) => {
    housingType.addEventListener(`change`, (evt) => {
      const target = evt.target;

      if (target.value === type) {
        pricePerNight.setAttribute(`min`, price);
        pricePerNight.setAttribute(`placeholder`, price);
      }
    });
  };

  for (let i = 0; i < window.data.TYPES.length; i++) {
    addHousingTypeChangeHandler(window.data.TYPES[i], PRICE_PER_NIGHT[i]);
  }

  const timeIn = window.main.adForm.querySelector(`#timein`);

  const timeOut = window.main.adForm.querySelector(`#timeout`);

  timeIn.addEventListener(`change`, (evt) => {
    const target = evt.target;

    timeOut.value = target.value;
  });

  timeOut.addEventListener(`change`, (evt) => {
    const target = evt.target;

    timeIn.value = target.value;
  });
})();
