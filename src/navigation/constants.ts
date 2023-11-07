export enum Routes {
  home = 'home',
  details = 'details',
}

type CommonRouteParams = {};

export type RouteParams = {
  [Routes.home]?: CommonRouteParams;
  [Routes.details]?: CommonRouteParams;
};

export const constants = {
  initialRoute: Routes.home,
} as const;
