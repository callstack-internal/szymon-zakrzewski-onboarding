import React from 'react';
import {FlatList, StyleProp, StyleSheet, ViewStyle} from 'react-native';

import constants from '../../../constants';
import Separator from '../../../components/Separator';
import CityWeatherCard from '../../../components/CityWeatherCard';

type ListItem = {
  id: string;
  city: string;
  weather: string;
  temperature: string;
};

type Props = {
  data: Array<ListItem>;
  onPress: (item: ListItem) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

function CityWeatherList({
  data,
  onPress,
  contentContainerStyle,
}: Props): JSX.Element {
  return (
    <FlatList<ListItem>
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyExtractor={item => item.id}
      data={data}
      renderItem={({item}) => (
        <CityWeatherCard
          item={item}
          onPress={listItem => onPress(listItem)}
          style={styles.item}
        />
      )}
      ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: constants.margins.small,
  },
  contentContainer: {
    paddingVertical: constants.margins.medium,
  },
  item: {
    paddingHorizontal: constants.margins.medium,
    paddingVertical: constants.margins.small,
  },
});

export default CityWeatherList;
