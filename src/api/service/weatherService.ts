import axios from 'axios';
import {Value} from '@sinclair/typebox/value';
import Config from 'react-native-config';

import {CityWeather} from 'app/api/data/CityWeather';
import {GroupWeather} from 'app/api/data/GroupWeather';
import {APIError, ErrorCode} from 'app/api/Error';

const apiUrl = 'https://api.openweathermap.org/';
const endpoints = {
  cityGroup: 'data/2.5/group',
  city: 'data/2.5/weather',
};
const requestTimeoutMs = 10000;

const weatherApi = axios.create({
  baseURL: apiUrl,
  timeout: requestTimeoutMs,
  params: {
    appid: Config.WEATHER_API_KEY,
  },
});

async function getWeatherForCities(id: number[]): Promise<GroupWeather> {
  const response = await weatherApi.get(endpoints.cityGroup, {
    params: {
      id: id.join(','),
      units: 'metric',
    },
  });
  if (!Value.Check(GroupWeather, response.data)) {
    throw new APIError(
      ErrorCode.ResponseInvalid,
      'getWeatherForCities: invalid data',
    );
  }
  return response.data;
}

async function getWeatherForCity(id: number): Promise<CityWeather> {
  const response = await weatherApi.get(endpoints.city, {
    params: {id},
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
