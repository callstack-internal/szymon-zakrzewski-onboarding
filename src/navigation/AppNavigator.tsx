import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {constants} from './constants';
import {screensMap} from './routing';

const Stack = createNativeStackNavigator();

const screens = Object.entries(screensMap);

function AppNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={constants.initialRoute}>
      {screens.map(([route, {component, options}]) => (
        <Stack.Screen
          key={`stack-${route}-screen`}
          name={route}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}

export default AppNavigator;
