import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';

import CityWeatherCard from 'app/components/CityWeatherCard';
import {ScreenProps} from 'app/navigation/constants';
import constants from 'app/constants';
import Separator from 'app/components/Separator';
import {CityWeather} from 'app/api/data/CityWeather';
import {APIError} from 'app/api/Error';
import api from 'app/api';
import {translations} from 'app/locales/translations';

import DetailsRow from './components/DetailsRow';

type CityWeatherDetails = {
  humidity: number;
  pressure: number;
  wind: number;
  clouds: number;
};

const weatherDetailsMap = {
  humidity: {
    title: translations.detailsScreen.humidity,
    unit: '%',
  },
  pressure: {
    title: translations.detailsScreen.pressure,
    unit: ' hPa',
  },
  wind: {
    title: translations.detailsScreen.wind,
    unit: ' km/h',
  },
  clouds: {
    title: translations.detailsScreen.clouds,
    unit: '%',
  },
};

const mapData = (key: keyof CityWeatherDetails, value: number) => {
  const {title, unit} = weatherDetailsMap[key];
  return {
    title,
    value: `${value}${unit}`,
  };
};

function DetailsScreen({route}: ScreenProps<'details'>): JSX.Element {
  const {data} = useQuery<CityWeather, APIError | Error, CityWeatherDetails>({
    queryKey: ['weatherForCities', route.params.id],
    queryFn: () => api.weatherService.getWeatherForCity(route.params.id),
    select: item => ({
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind: item.wind.speed,
      clouds: item.clouds.all,
    }),
  });

  return (
    <View style={styles.container}>
      <CityWeatherCard
        item={route.params}
        showNavArrow={false}
        style={styles.card}
      />
      <Separator />
      {Object.entries(data || []).map(([dataKey, dataValue]) => {
        const {title, value} = mapData(
          dataKey as keyof CityWeatherDetails,
          dataValue,
        );
        return (
          <DetailsRow
            key={`details-row-${title}`}
            title={title}
            value={value}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: constants.margins.medium,
    paddingHorizontal: constants.margins.medium,
  },
  card: {
    paddingTop: constants.margins.small,
    paddingBottom: constants.margins.medium,
    paddingHorizontal: constants.margins.small,
  },
});

export default DetailsScreen;
