import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLeafletLocationMapController } from '../cpnController/useLeafletLocationMap.controller';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletLocationMapProps {
    latitude?: number;
    longitude?: number;
    onLocationChange?: (lat: number, lng: number) => void;
}

function MapCenterUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom(), { animate: true });
    }, [center, map]);
    return null;
}

export default function LeafletLocationMap({ latitude, longitude, onLocationChange }: LeafletLocationMapProps) {
    const {
        center,
        position,
        markerRef,
        eventHandlers
    } = useLeafletLocationMapController(latitude, longitude, onLocationChange);

    return (
        <MapContainer 
            center={center} 
            zoom={15} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
            />
            <MapCenterUpdater center={position} />
        </MapContainer>
    );
}
