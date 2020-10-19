'use strict';

const User_Number = [`01`, `02`, `03`, `04`, `05`, `06`, `07`, `08`];

const Location_X;

const Location_Y;

const Type = [`palace`, `flat`, `house`, `bungalow`];

const Checkin = [`12:00`, `13:00`, `14:00`];

const Checkout = [`12:00`, `13:00`, `14:00`];

const Features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const Photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

const getRandomData = (data) => {
  const datum = data[Math.random()];

  return datum;
};

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
        "avatar": url("../img/avatars/userUser_Number[i].png")
      },
      "offer": {
        "title": title,
        "address": Location_X, Location_Y,
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
