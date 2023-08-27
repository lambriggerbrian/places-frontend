import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");

      let latLng = new window.google.maps.LatLng(center);

      let map = new Map(mapRef.current, {
        center: latLng,
        zoom: zoom,
      });

      new window.google.maps.Marker({ position: center, map: map });
    }

    initMap();
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
