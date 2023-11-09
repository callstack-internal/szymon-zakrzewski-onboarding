import React from 'react';
import {Button, View} from 'react-native';

import useNavigation from 'app/navigation/useNavigation';
import {translations} from 'app/locales/translations';
import common from 'app/styles/common';
import {Routes} from 'app/navigation/constants';

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
