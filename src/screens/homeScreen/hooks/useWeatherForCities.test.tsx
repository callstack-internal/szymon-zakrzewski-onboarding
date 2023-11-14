import React from 'react';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';

import api from 'app/api';
import {mockInvalidCityIds, mockValidCityIds} from 'app/api/mocks/mockData';
import {server} from 'app/api/mocks/server';
import {APIError} from 'app/api/Error';

import {useWeatherForCities} from './useWeatherForCities';

beforeAll(() => server.listen()); // Start the interception.
afterEach(() => server.resetHandlers()); // Remove handlers added in individual tests.
afterAll(() => server.close()); // Disable request interception and clean up.

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

describe('useWeatherForCities', () => {
  it('should load mock data', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockValidCityIds),
    );
    const {result} = renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));
  });

  it('should return APIError', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockInvalidCityIds),
    );
    const {result} = renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.data).toBe(undefined));
    await waitFor(() => expect(result.current.error).toBeInstanceOf(APIError));
  });

  it('should call api once', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockValidCityIds),
    );
    renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(mockFunction.mock.calls).toHaveLength(1));
  });

  it('should call api twice after refetch', async () => {
    const mockFunction = jest.fn(() =>
      api.weatherService.getWeatherForCities(mockValidCityIds),
    );
    const {result} = renderHook(() => useWeatherForCities(mockFunction), {
      wrapper: Wrapper,
    });
    await waitFor(() => expect(mockFunction.mock.calls).toHaveLength(1));
    act(() => {
      result.current.refetch();
    });
    await waitFor(() => expect(mockFunction.mock.calls).toHaveLength(2));
  });
});
