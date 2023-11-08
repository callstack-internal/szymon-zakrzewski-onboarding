import React from 'react';
import {Button, View} from 'react-native';

import useNavigation from '../../navigation/useNavigation';
import {Routes} from '../../navigation/constants';
import {translations} from '../../locales/translations';
import common from '../../styles/common';

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={common.centered}>
      <Button
        title={translations.screenTitle.details}
        onPress={() => navigation.navigate(Routes.details)}
      />
    </View>
  );
}

export default HomeScreen;
