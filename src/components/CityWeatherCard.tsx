import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import constants from 'app/constants';
import colors from 'app/styles/colors';
import BadgeLabel from 'app/components/BadgeLabel';
import NavArrow from 'app/components/NavArrow';

type Item = {
  id: string;
  city: string;
  weather: string;
  temperature: string;
};

type Props = {
  item: Item;
  onPress: (itemData: Item) => void;
  showNavArrow?: boolean;
  style?: StyleProp<ViewStyle>;
};

function CityWeatherCard({
  item,
  showNavArrow = true,
  style,
  onPress,
}: Props): JSX.Element {
  const {city, weather, temperature} = item;
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(item)}>
      <View style={styles.cityContainer}>
        <Text style={styles.textTitle}>{city}</Text>
        <Text style={styles.textBase}>{weather}</Text>
      </View>
      <BadgeLabel text={temperature} />
      {showNavArrow && <NavArrow size="m" direction="right" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityContainer: {
    flex: 1,
  },
  textTitle: {
    fontSize: constants.text.base.size,
    color: colors.text.primary,
  },
  textBase: {
    fontSize: constants.text.small.size,
    color: colors.text.secondary,
  },
});

export default CityWeatherCard;
