import React, { useEffect, useRef } from "react";

const MapComponent = ({ address, onDirections }) => {
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
    directionsRendererRef.current.setMap(map);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        currentLocationMarkerRef.current = new window.google.maps.Marker({
          map,
          position: currentLocation,
          title: "Your Current Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        map.setCenter(currentLocation);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [address]);

  const calculateAndDisplayRoute = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        directionsServiceRef.current.route(
          {
            origin,
            destination: address,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRendererRef.current.setDirections(response);
              const route = response.routes[0].legs[0];
              onDirections({
                distance: route.distance.text,
                duration: route.duration.text,
              });
            } else {
              onDirections({
                error: "No route exists from your location.",
              });
              console.error("Directions request failed due to " + status);
            }
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
      <button id="get-directions-button" onClick={calculateAndDisplayRoute}>Get Directions</button>
    </div>
  );
};

export default MapComponent;