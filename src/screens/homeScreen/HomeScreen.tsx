import React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';

import useNavigation from 'app/navigation/useNavigation';
import {Routes} from 'app/navigation/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CityWeatherList from './components/CItyWeatherList';

import common from 'app/styles/common';
import {translations} from 'app/locales/translations';
import constants from 'app/constants';
import colors from 'app/styles/colors';

import {useWeatherForCities} from './hooks/useWeatherForCities';

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {isLoading, data, error, refetch} = useWeatherForCities();

  if (isLoading) {
    return (
      <ActivityIndicator
        accessible
        size="large"
        role="progressbar"
        style={{
          ...common.centered,
          paddingBottom: insets.bottom,
        }}
      />
    );
  }

  if (error || !data) {
    return (
      <View
        style={{
          ...common.centered,
          paddingBottom: insets.bottom,
        }}>
        <Text style={styles.textTitle}>
          {translations.homeScreen.error.message}
        </Text>
        <Button title={translations.common.retry} onPress={refetch} />
      </View>
    );
  }

  return (
    <View>
      <CityWeatherList
        data={data}
        onPress={item => {
          navigation.navigate(Routes.details, {...item});
        }}
        contentContainerStyle={{paddingBottom: insets.bottom}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: constants.text.base.size,
    color: colors.text.primary,
  },
});

export default HomeScreen;
