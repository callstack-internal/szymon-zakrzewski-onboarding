export const mockValidCityIds = [1, 2];
export const mockInvalidCityIds = [3, 4];

export const mockCityWeather = [
  {
    id: mockValidCityIds[0],
    name: 'Barcelona',
    coord: {
      lat: 10.5,
      lon: 11.5,
    },
    clouds: {
      all: 0,
    },
    main: {
      humidity: 50,
      pressure: 1000,
      temp: 30,
    },
    weather: [
      {
        icon: 'icon_sun',
        main: 'sun',
      },
    ],
    wind: {
      speed: 10,
    },
  },
  {
    id: mockValidCityIds[1],
    name: 'Nairobi',
    coord: {
      lat: 10.5,
      lon: 11.5,
    },
    clouds: {
      all: 0,
    },
    main: {
      humidity: 50,
      pressure: 1000,
      temp: 25,
    },
    weather: [
      {
        icon: 'icon_rain',
        main: 'rain',
      },
    ],
    wind: {
      speed: 10,
    },
  },
  {
    id: mockInvalidCityIds[0],
    name: 'Warsaw',
    coord: {
      lat: 10.5,
      lon: 11.5,
    },
  },
  {
    id: mockInvalidCityIds[1],
    name: 'Sumy',
    coord: {
      lat: 10.5,
      lon: 11.5,
    },
  },
];
