'use strict';

(function () {

  const adCardTemplate = document.querySelector(`#card`).content.firstElementChild;

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

  window.card.renderAdCard = renderAdCard;
})();
