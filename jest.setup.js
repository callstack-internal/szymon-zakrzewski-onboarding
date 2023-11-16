/* eslint-disable no-undef */
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

jest.mock('./src/native/Location', () => ({
  getCurrentLocation: () => Promise.reject(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({}),
}));
