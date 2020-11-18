'use strict';

(function () {

  const PIN_MAIN_POINT_HEIGHT = 22;

  const fragment = document.createDocumentFragment();

  const adverts = window.data.createSimilarAdverts();

  const adsFilter = window.main.adsMap.querySelector(`.map__filters-container`);

  const activatePage = () => {
    window.main.adsMap.classList.remove(`map--faded`);

    window.main.adForm.classList.remove(`ad-form--disabled`);

    window.main.mapFiltersFormFilters.forEach((value) => {
      value.removeAttribute(`disabled`);
    });

    window.main.adFormFieldsets.forEach((value) => {
      value.removeAttribute(`disabled`);
    });

    window.main.adFormAdressInput.value = `${Math.round(parseInt(window.main.mapPinMain.style.getPropertyValue(`left`), 10) + window.main.PIN_MAIN_WIDTH / 2)}, ${Math.round(parseInt(window.main.mapPinMain.style.getPropertyValue(`top`), 10) + window.main.PIN_MAIN_HEIGHT + PIN_MAIN_POINT_HEIGHT)}`;

    for (let i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.renderAdPin(adverts[i]));
    }

    window.main.mapPins.appendChild(fragment);

    const adPinElements = window.main.mapPins.querySelectorAll(`button[data-id = map-pin-element]`);

    const addMapPinClickHandler = (adPinElement, advert) => {

      adPinElement.addEventListener(`click`, (evt) => {
        const target = evt.target;
        const id = target.closest(`.map__pin`).dataset.id;
        const popup = window.main.adsMap.querySelector(`.popup`);

        if (id !== undefined) {
          if (window.main.adsMap.contains(popup)) {
            window.main.adsMap.removeChild(popup);
          }
          if (adPinElement) {
            const newPopup = window.card.renderAdCard(advert);

            window.main.adsMap.insertBefore(newPopup, adsFilter);

            const popupClose = newPopup.querySelector(`.popup__close`);

            const onPopupEscPress = (press) => {
              if (press.key === `Escape`) {
                press.preventDefault();
                closePopup();
              }
            };

            const closePopup = () => {
              window.main.adsMap.removeChild(newPopup);

              document.removeEventListener(`keydown`, onPopupEscPress);
            };

            document.addEventListener(`keydown`, onPopupEscPress);

            popupClose.addEventListener(`click`, () => {
              closePopup();
            });
          }
        }
      });
    };

    for (let i = 0; i < adPinElements.length; i++) {
      addMapPinClickHandler(adPinElements[i], adverts[i]);
    }

    window.main.mapPinMain.removeEventListener(`mousedown`, mapPinMainMousedownHandler);
    window.main.mapPinMain.removeEventListener(`keydown`, mapPinMainKeydownEnterHandler);
  };

  const mapPinMainMousedownHandler = (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  };

  window.main.mapPinMain.addEventListener(`mousedown`, mapPinMainMousedownHandler);

  const mapPinMainKeydownEnterHandler = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  window.main.mapPinMain.addEventListener(`keydown`, mapPinMainKeydownEnterHandler);
})();
