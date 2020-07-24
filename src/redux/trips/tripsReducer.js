import { combineReducers } from 'redux';

var tempTrips = [
  {
    title: "Greece Honeymoon",
    days: 3
  },
  {
    title: "Japan Grad",
    days: 4
  },
  {
    title: "Mexico Christmas",
    days: 7
  }
];

var tempGreeceTrip = {
  title: "Greece Honeymoon",
  days: 3,
  media: [
    [0,1,2],
    [3,4],
    [5]
  ]
};

const tripsReducers = (trips = tempTrips, action) => {
  if (action.type === 'ADD_TRIP' && action.title !== "") {
    return [...trips, {title: action.title, days: action.days}];
  }
  if (action.type === 'DELETE_TRIP') {
    return trips.filter(trip => trip.title !== action.title);
  }
  return trips;
}

export const tripsReducer = {
  trips: tripsReducers
};
