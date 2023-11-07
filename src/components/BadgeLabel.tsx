import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '../styles/colors';
import constants from '../constants';

type Props = {
  text: string;
};
function BadgeLabel({text}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: constants.dimensions.badgeLabel.width,
    height: constants.dimensions.badgeLabel.height,
    borderRadius: constants.dimensions.badgeLabel.borderRadius,
    backgroundColor: colors.badgeLabel.background,
    paddingHorizontal: constants.dimensions.badgeLabel.padding,
  },
  text: {
    color: colors.badgeLabel.text,
    fontSize: constants.text.base.size,
  },
});

export default BadgeLabel;
