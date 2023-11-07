import React from 'react';
import {Button, View} from 'react-native';

import useNavigation from '../navigation/useNavigation';
import {translations} from '../locales/translations';
import common from '../styles/common';

function DetailsScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={common.centered}>
      <Button title={translations.common.back} onPress={navigation.goBack} />
    </View>
  );
}

export default DetailsScreen;
