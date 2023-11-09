import {NavigationProp, useNavigation} from '@react-navigation/native';

import {RouteParams, Routes} from 'app/navigation/constants';

export default () => useNavigation<NavigationProp<RouteParams, Routes>>();
