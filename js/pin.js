'use strict';

(function () {

  const PIN_WIDTH = 50;

  const PIN_HEIGHT = 70;

  const adPinTemplate = document.querySelector(`#pin`).content.firstElementChild;

  const renderAdPin = (advert) => {
    const adPinElement = adPinTemplate.cloneNode(true);

    adPinElement.setAttribute(`data-id`, `map-pin-element`);

    adPinElement.style = `left: ${advert.location.x - PIN_WIDTH / 2}px; top: ${advert.location.y - PIN_HEIGHT}px;`;
    adPinElement.querySelector(`img`).src = advert.author.avatar;
    adPinElement.querySelector(`img`).alt = advert.offer.title;

    return adPinElement;
  };

  window.pin.renderAdPin = renderAdPin;
})();
