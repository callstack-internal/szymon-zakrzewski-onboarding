import {ComponentType} from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import HomeScreen from 'app/screens/homeScreen/HomeScreen';
import DetailsScreen from 'app/screens/detailsScreen/DetailsScreen';
import {translations} from 'app/locales/translations';

import {Routes, ScreenProps} from './constants';

type ScreenMapProps = {
  component: ComponentType<ScreenProps<any>>;
  options?: NativeStackNavigationOptions;
};

export const screensMap: Record<Routes, ScreenMapProps> = {
  home: {
    component: HomeScreen,
    options: {title: translations.screenTitle.home},
  },
  details: {
    component: DetailsScreen,
    options: {title: translations.screenTitle.details},
  },
};
