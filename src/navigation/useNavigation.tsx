import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RouteParams, Routes} from './constants';

export default () => useNavigation<NavigationProp<RouteParams, Routes>>();
