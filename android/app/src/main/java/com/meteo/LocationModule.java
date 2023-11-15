package com.meteo;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.concurrent.Executors;
import java.util.function.Consumer;

public class LocationModule extends ReactContextBaseJavaModule {
    LocationModule(ReactApplicationContext context) {
        super(context);
    }
    @NonNull
    @Override
    public String getName() {
        return "LocationModule";
    }
    @ReactMethod
    public void getCurrentLocation(Promise promise) {
        ReactContext reactContext = getReactApplicationContext();
        if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED)
        {
            promise.reject(getName(), "Location permission not granted");
            return;
        }

        Consumer<Location> localConsumer = location -> {
            WritableMap data = new WritableNativeMap();
            data.putDouble("latitude", location.getLatitude());
            data.putDouble("longitude", location.getLongitude());
            promise.resolve(data);
        };
        LocationManager locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        locationManager.getCurrentLocation(
                LocationManager.GPS_PROVIDER,
                null,
                Executors.newFixedThreadPool(1),
                localConsumer
        );
    }
}
