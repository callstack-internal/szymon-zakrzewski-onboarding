import React from 'react';
import Separator from 'app/components/Separator';
import {StyleSheet, Text, View} from 'react-native';
import constants from 'app/constants';
import colors from 'app/styles/colors';

function DetailsRow({
  title,
  value,
}: {
  title: string;
  value: string;
}): JSX.Element {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Separator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: constants.margins.medium,
  },
  title: {
    flex: 1,
    fontSize: constants.text.base.size,
    color: colors.text.primary,
    paddingVertical: constants.margins.medium,
  },
  value: {
    fontSize: constants.text.base.size,
    color: colors.text.secondary,
    paddingVertical: constants.margins.medium,
  },
});

export default DetailsRow;
