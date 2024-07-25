"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
	iconUrl: "https://static.thenounproject.com/png/335079-200.png",
	iconSize: [50, 50],
});
function Map({ locationValue }: { locationValue: string }) {
	const { getCountryByValue } = useCountries();
	const latlng = getCountryByValue(locationValue)?.latlng;
	return (
		<MapContainer
			scrollWheelZoom={false}
			className="h-[50vh] rounded-lg relative z-0"
			center={latlng ?? [51.505, -0.09]}
			zoom={8}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={latlng ?? [51.505, -0.09]} icon={ICON} />
		</MapContainer>
	);
}

export default Map;
