import React from 'react';
import {Button, View} from 'react-native';

import useNavigation from 'app/navigation/useNavigation';
import {translations} from 'app/locales/translations';
import common from 'app/styles/common';

function DetailsScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={common.centered}>
      <Button title={translations.common.back} onPress={navigation.goBack} />
    </View>
  );
}

export default DetailsScreen;
