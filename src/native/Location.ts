import {NativeModules} from 'react-native';
const {LocationModule} = NativeModules;

export type Location = {
  latitude: number;
  longitude: number;
};

interface LocationInterface {
  getCurrentLocation(): Promise<Location>;
}

export default LocationModule as LocationInterface;
