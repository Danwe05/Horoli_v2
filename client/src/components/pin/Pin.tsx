import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }: any) {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7882/7882197.png ",
    iconSize: [32, 37], // size of the icon
    iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
  });
  return (
    <Marker icon={customIcon} position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
