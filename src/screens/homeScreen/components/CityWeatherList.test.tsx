import React from 'react';
import {
  render,
  renderHook,
  waitFor,
  screen,
  userEvent,
} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';

import api from 'app/api';
import {mockCityWeather, mockValidCityIds} from 'app/api/mocks/mockData';
import {server} from 'app/api/mocks/server';
import {useWeatherForCities} from 'app/screens/homeScreen/hooks/useWeatherForCities';

import CityWeatherList from './CItyWeatherList';

beforeAll(() => server.listen()); // Start the interception.
afterEach(() => server.resetHandlers()); // Remove handlers added in individual tests.
afterAll(() => server.close()); // Disable request interception and clean up.
jest.useFakeTimers();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

function Wrapper({children}: {children?: React.ReactNode}): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NavigationContainer>
  );
}

describe('CityWeatherList', () => {
  it('should display data', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockValidCityIds),
    );
    const {result} = renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));

    render(<CityWeatherList data={result.current.data!} onPress={() => {}} />);

    const validCityWeatherData = mockCityWeather.filter(({id}) =>
      mockValidCityIds.includes(id),
    );

    for (const data of validCityWeatherData) {
      screen.getByText(data.name);
      screen.getByText(data.weather![0].main);
      screen.getByText(`${data.main!.temp} °C`);
    }
  });

  it('should call onPress callback on touch', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockValidCityIds),
    );
    const {result} = renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));

    const mockOnPress = jest.fn(() => {});

    render(
      <CityWeatherList data={result.current.data!} onPress={mockOnPress} />,
    );

    const validCityWeatherData = mockCityWeather.filter(({id}) =>
      mockValidCityIds.includes(id),
    );

    let index = 0;
    for (const data of validCityWeatherData) {
      const element = screen.getByText(data.name);
      const user = userEvent.setup();
      await user.press(element);
      await waitFor(() =>
        expect(mockOnPress.mock.calls).toHaveLength(index + 1),
      );
      index++;
    }
  });
});
