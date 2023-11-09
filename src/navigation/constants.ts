import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum Routes {
  home = 'home',
  details = 'details',
}

type CommonRouteParams = {};

export type RouteParams = {
  [Routes.home]?: CommonRouteParams;
  [Routes.details]: DetailsScreenParams;
};

type DetailsScreenParams = {
  id: number;
  city: string;
  weather: string;
  temperature: string;
} & CommonRouteParams;

export type ScreenProps<T extends keyof RouteParams> = NativeStackScreenProps<
  RouteParams,
  T
>;

export const constants = {
  initialRoute: Routes.home,
} as const;
