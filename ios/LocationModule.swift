//
//  LocationModule.swift
//  meteo
//
//  Created by Szymon Zakrzewski on 15/11/2023.
//

import Foundation
import CoreLocation

struct Location {
  let latitude: Double
  let longitude: Double
}
@objc(LocationModule)
class LocationModule: NSObject, CLLocationManagerDelegate {
  private var locationManager = CLLocationManager()
  private var locationUpdateHandler: ((Location?) -> Void)?
  override init() {
    super.init()
    locationManager.delegate = self
  }
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) -> Void {
    if let lastLocation = locations.last {
      self.locationUpdateHandler?(Location(
        latitude: lastLocation.coordinate.latitude,
        longitude: lastLocation.coordinate.longitude
      ))
    }
  }
  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    self.locationUpdateHandler?(nil)
  }
  @objc(getCurrentLocation:rejecter:)
  func getCurrentLocation(resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void {
    self.locationUpdateHandler = { location in
      if let location = location {
        resolver([
          "latitude": location.latitude,
          "longitude": location.longitude
        ])
      } else {
        rejecter("getCurrentLocation", "Could not get location - check permissions", nil)
      }

      self.locationUpdateHandler = nil
    }
    self.locationManager.requestLocation()
 }
}
