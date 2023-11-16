import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';

import api from 'app/api';
import {GroupWeather} from 'app/api/data/GroupWeather';
import {APIError} from 'app/api/Error';
import constants from 'app/constants';
import {useRefCallback} from 'app/hooks/useRefCallback';
import {CityListItem} from 'app/screens/homeScreen/components/CItyWeatherList';
import {useCurrentLocation} from './useCurrentLocation';
import {Location} from 'app/native/Location';
import {useEffect, useState} from 'react';

type CityListItemWithLocation = CityListItem & {location: Location};

// We should calculate the actual distance, not the absolute differences
// in latitude and longitude, but let's keep it simple for now.
const sortByLocation = (
  target: Location,
  items: CityListItemWithLocation[],
): CityListItemWithLocation[] => {
  return items.sort(({location: lhsLocation}, {location: rhsLocation}) => {
    const lhsLatitudeDiff = Math.abs(target.latitude - lhsLocation.latitude);
    const lhsLongitudeDiff = Math.abs(target.longitude - lhsLocation.longitude);
    const lhsDiff = lhsLatitudeDiff + lhsLongitudeDiff;

    const rhsLatitudeDiff = Math.abs(target.latitude - rhsLocation.latitude);
    const rhsLongitudeDiff = Math.abs(target.longitude - rhsLocation.longitude);
    const rhsDiff = rhsLatitudeDiff + rhsLongitudeDiff;

    return lhsDiff - rhsDiff;
  });
};

export function useWeatherForCities() {
  const {
    isLoading,
    isFetching,
    data,
    error,
    refetch: _refetch,
  } = useQuery<GroupWeather, APIError | Error, CityListItemWithLocation[]>({
    queryKey: ['weatherForCities'],
    queryFn: () => api.weatherService.getWeatherForCities(constants.cities),
    select: ({list}) =>
      list.map(item => ({
        id: item.id,
        city: item.name,
        weather: item.weather[0]?.main || '',
        temperature: `${item.main.temp}`,
        location: {
          latitude: item.coord.lat,
          longitude: item.coord.lon,
        },
      })),
  });

  const {location} = useCurrentLocation();
  const [sortedData, setSortedData] = useState<CityListItem[]>();

  useEffect(() => {
    if (!data || !location) {
      return;
    }
    setSortedData(sortByLocation(location, data.slice()));
  }, [data, location]);

  const refetch = useRefCallback(() => {
    if (isFetching) {
      return;
    }
    _refetch({throwOnError: true});
  });

  useFocusEffect(refetch);

  return {
    isLoading,
    data: sortedData || data,
    error,
    refetch,
  };
}
