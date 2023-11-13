import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {weatherApiEndpoints, weatherApiUrl} from 'app/api/endpoints';
import {GetWeatherForCitiesParams} from 'app/api/service/weatherService';
import {mockCityWeather} from './mockData';

const getWeatherForCitiesHandler = rest.get(
  weatherApiUrl + weatherApiEndpoints.cityGroup,
  (req, res, ctx) => {
    const requestedIdsString = req.url.searchParams.get(
      'id',
    ) as GetWeatherForCitiesParams['id'];
    const requestedIds = requestedIdsString.split(',');
    const data = {
      cnt: requestedIds.length,
      list: mockCityWeather.filter(cityWeather =>
        requestedIds.includes(`${cityWeather.id}`),
      ),
    };
    return res(ctx.status(200), ctx.json(data));
  },
);

const getWeatherForCityHandler = rest.get(
  weatherApiUrl + weatherApiEndpoints.city,
  (req, res, ctx) => {
    const requestedId = req.url.searchParams.get('id');
    const data = requestedId
      ? mockCityWeather.find(cityWeather => cityWeather.id === +requestedId)
      : null;
    return res(ctx.status(200), ctx.json(data));
  },
);

export const handlers = [getWeatherForCitiesHandler, getWeatherForCityHandler];

export const server = setupServer(...handlers);
