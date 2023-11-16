import React from 'react';
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';

import {mockCityWeather, mockValidCityIds} from 'app/api/mocks/mockData';
import {invalidDataHandlers, server} from 'app/api/mocks/server';

import HomeScreen from './HomeScreen';
import {translations} from 'app/locales/translations';

beforeAll(() => server.listen()); // Start the interception.
beforeEach(() => queryClient.clear()); // Clear cache.
afterEach(() => server.resetHandlers()); // Remove handlers added in individual tests.
afterAll(() => server.close()); // Disable request interception and clean up.
jest.useFakeTimers();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      gcTime: 0,
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

describe('HomeScreen', () => {
  it('Should render loading indicator', async () => {
    render(<HomeScreen />, {wrapper: Wrapper});
    screen.getByRole('progressbar');
  });

  it('Should render cities weater list', async () => {
    render(<HomeScreen />, {wrapper: Wrapper});

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    const validCityWeatherData = mockCityWeather.filter(({id}) =>
      mockValidCityIds.includes(id),
    );
    for (const data of validCityWeatherData) {
      screen.getByText(data.name);
      screen.getByText(data.weather![0].main);
      screen.getByText(`${data.main!.temp} °C`);
    }
  });

  it('Should render error message', async () => {
    server.use(...invalidDataHandlers);
    render(<HomeScreen />, {wrapper: Wrapper});

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    screen.getByText(translations.homeScreen.error.message);
    screen.getByText(translations.common.retry);
  });
});
