import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {weatherApiEndpoints, weatherApiUrl} from 'app/api/endpoints';
import {
  mockCityWeather,
  mockInvalidCityIds,
  mockValidCityIds,
} from './mockData';

export const validDataHandlers = [
  rest.get(weatherApiUrl + weatherApiEndpoints.cityGroup, (req, res, ctx) => {
    const list = mockCityWeather.filter(cityWeather =>
      mockValidCityIds.includes(cityWeather.id),
    );
    const data = {
      cnt: list.length,
      list: list,
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(weatherApiUrl + weatherApiEndpoints.city, (req, res, ctx) => {
    const data = mockCityWeather.find(
      cityWeather => cityWeather.id === mockValidCityIds[0],
    );
    return res(ctx.status(200), ctx.json(data));
  }),
];

export const invalidDataHandlers = [
  rest.get(weatherApiUrl + weatherApiEndpoints.cityGroup, (req, res, ctx) => {
    const list = mockCityWeather.filter(cityWeather =>
      mockInvalidCityIds.includes(cityWeather.id),
    );
    const data = {
      cnt: list.length,
      list: list,
    };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(weatherApiUrl + weatherApiEndpoints.city, (req, res, ctx) => {
    const data = mockCityWeather.find(
      cityWeather => cityWeather.id === mockInvalidCityIds[0],
    );
    return res(ctx.status(200), ctx.json(data));
  }),
];

export const server = setupServer(...validDataHandlers);
