import {useCallback, useEffect, useRef, useState} from 'react';

import LocationModule, {Location} from 'app/native/Location';

export function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const mounted = useRef(false);

  const refresh = useCallback(() => {
    LocationModule.getCurrentLocation()
      .then(location => {
        if (!mounted.current) {
          return;
        }
        setCurrentLocation(location);
      })
      .catch(locationError => {
        console.warn(
          'useCurrentLocation: could not get current location',
          locationError,
        );
      });
  }, []);

  useEffect(() => {
    mounted.current = true;
    refresh();
    return () => {
      mounted.current = false;
    };
  }, [refresh]);

  return {
    location: currentLocation,
    refreshLocation: refresh,
  };
}
