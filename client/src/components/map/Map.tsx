import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./map.scss";

import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { useState } from "react";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
function Map({ items }: any) {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [4.2040, 12.7493]
      }
      zoom={7}
      scrollWheelZoom={true}
      className="!w-full !h-full"
    >
      {/* Add GeolocateControl here */}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item: any) => (
        <Pin item={item} key={item.id} />
      ))}
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
