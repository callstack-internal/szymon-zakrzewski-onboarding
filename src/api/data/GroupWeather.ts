import {Type, Static} from '@sinclair/typebox';

export const GroupWeather = Type.Object({
  cnt: Type.Number(),
  list: Type.Array(
    Type.Object({
      id: Type.Number(),
      name: Type.String(),
      coord: Type.Object({
        lat: Type.Number(),
        lon: Type.Number(),
      }),
      clouds: Type.Object({
        all: Type.Number(),
      }),
      main: Type.Object({
        humidity: Type.Number(),
        pressure: Type.Number(),
        temp: Type.Number(),
      }),
      weather: Type.Array(
        Type.Object({
          icon: Type.String(),
          main: Type.String(),
        }),
      ),
      wind: Type.Object({
        speed: Type.Number(),
      }),
    }),
  ),
});

export type GroupWeather = Static<typeof GroupWeather>;
