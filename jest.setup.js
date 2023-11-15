// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line no-undef
jest.mock('./src/native/Location', () => ({
  getCurrentLocation: () => Promise.reject(),
}));
