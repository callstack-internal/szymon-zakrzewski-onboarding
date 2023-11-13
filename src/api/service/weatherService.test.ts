import {server} from 'app/api/mocks/server';
import {mockInvalidCityIds, mockValidCityIds} from 'app/api/mocks/mockData';
import {APIError} from 'app/api//Error';
import weatherService from './weatherService';

beforeAll(() => server.listen()); // Start the interception.
afterEach(() => server.resetHandlers()); // Remove handlers added in individual tests.
afterAll(() => server.close()); // Disable request interception and clean up.

describe('WeatherService', () => {
  describe('API getWeatherForCity', () => {
    it('should return valid data', async () => {
      const result = await weatherService.getWeatherForCity(
        mockValidCityIds[0],
      );
      expect(result.id).toBe(mockValidCityIds[0]);
    });
    it('should throw APIError', async () => {
      await expect(async () => {
        await weatherService.getWeatherForCity(mockInvalidCityIds[0]);
      }).rejects.toThrow(APIError);
    });
  });
  describe('API getWeatherForCities', () => {
    it('should return valid data', async () => {
      const result = await weatherService.getWeatherForCities(mockValidCityIds);
      expect(result.list.length).toBe(mockValidCityIds.length);
    });
    it('should throw APIError', async () => {
      await expect(async () => {
        await weatherService.getWeatherForCities(mockInvalidCityIds);
      }).rejects.toThrow(APIError);
    });
  });
});
