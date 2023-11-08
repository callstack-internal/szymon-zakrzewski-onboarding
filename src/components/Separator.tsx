import React from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../styles/colors';

type Props = {
  horizontal?: boolean;
};

function Separator({horizontal = true}: Props): JSX.Element {
  return <View style={horizontal ? styles.horizontal : styles.vertical} />;
}

const styles = StyleSheet.create({
  horizontal: {
    backgroundColor: colors.separator.background,
    height: StyleSheet.hairlineWidth,
  },
  vertical: {
    backgroundColor: colors.separator.background,
    width: StyleSheet.hairlineWidth,
  },
});

export default Separator;
