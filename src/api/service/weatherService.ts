import axios from 'axios';
import {Value} from '@sinclair/typebox/value';
import Config from 'react-native-config';

import {CityWeather} from 'app/api/data/CityWeather';
import {GroupWeather} from 'app/api/data/GroupWeather';
import {APIError, ErrorCode} from 'app/api/Error';
import {weatherApiEndpoints, weatherApiUrl} from 'app/api/endpoints';

const requestTimeoutMs = 10000;

const weatherApi = axios.create({
  baseURL: weatherApiUrl,
  timeout: requestTimeoutMs,
  params: {
    appid: Config.WEATHER_API_KEY,
  },
});

export type GetWeatherForCitiesParams = {
  id: string;
  units: string;
};

async function getWeatherForCities(id: number[]): Promise<GroupWeather> {
  const params: GetWeatherForCitiesParams = {
    id: id.join(','),
    units: 'metric',
  };
  const response = await weatherApi.get(weatherApiEndpoints.cityGroup, {
    params,
  });
  if (!Value.Check(GroupWeather, response.data)) {
    throw new APIError(
      ErrorCode.ResponseInvalid,
      'getWeatherForCities: invalid data',
    );
  }
  return response.data;
}

export type GetWeatherForCityParams = {
  id: number;
};

async function getWeatherForCity(id: number): Promise<CityWeather> {
  const params: GetWeatherForCityParams = {id};
  const response = await weatherApi.get(weatherApiEndpoints.city, {
    params,
  });
  if (!Value.Check(CityWeather, response.data)) {
    throw new APIError(
      ErrorCode.ResponseInvalid,
      'getWeatherForCity: invalid data',
    );
  }
  return response.data;
}

export default {
  getWeatherForCities,
  getWeatherForCity,
};
