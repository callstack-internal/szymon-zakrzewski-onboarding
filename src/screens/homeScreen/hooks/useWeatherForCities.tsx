import {useFocusEffect} from '@react-navigation/native';
import {useQuery, QueryFunction} from 'react-query';

import api from 'app/api';
import {GroupWeather} from 'app/api/data/GroupWeather';
import {APIError} from 'app/api/Error';
import constants from 'app/constants';
import {useRefCallback} from 'app/hooks/useRefCallback';
import {CityListItem} from 'app/screens/homeScreen/components/CItyWeatherList';

type UseWeatherForCities = {
  isLoading: boolean;
  data?: CityListItem[];
  error?: APIError | Error | null;
  refetch: () => void;
};

export function useWeatherForCities(
  queryFn?: QueryFunction<GroupWeather>,
): UseWeatherForCities {
  const {
    isLoading,
    isFetching,
    data,
    error,
    refetch: _refetch,
  } = useQuery<GroupWeather, APIError | Error, CityListItem[]>({
    queryKey: ['weatherForCities'],
    queryFn: context =>
      queryFn
        ? queryFn(context)
        : api.weatherService.getWeatherForCities(constants.cities),
    select: ({list}) =>
      list.map(item => ({
        id: item.id,
        city: item.name,
        weather: item.weather[0]?.main || '',
        temperature: `${item.main.temp}`,
      })),
  });

  const refetch = useRefCallback(() => {
    if (isFetching) {
      return;
    }
    _refetch({throwOnError: true});
  });

  useFocusEffect(refetch);

  return {
    isLoading,
    data,
    error,
    refetch,
  };
}
