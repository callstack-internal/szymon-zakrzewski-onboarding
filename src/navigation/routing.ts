import {ComponentType} from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import HomeScreen from 'app/screens/homeScreen/HomeScreen';
import DetailsScreen from 'app/screens/DetailsScreen';
import {translations} from 'app/locales/translations';

import {Routes} from './constants';

type ScreenProps = {
  component: ComponentType;
  options?: NativeStackNavigationOptions;
};
export const screensMap: Record<Routes, ScreenProps> = {
  home: {
    component: HomeScreen,
    options: {title: translations.screenTitle.home},
  },
  details: {
    component: DetailsScreen,
    options: {title: translations.screenTitle.details},
  },
};
