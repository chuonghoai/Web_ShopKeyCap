import { useState, useEffect, useRef, useMemo } from 'react';

export const useLeafletLocationMapController = (
    initialLat?: number,
    initialLng?: number,
    onLocationChange?: (lat: number, lng: number) => void
) => {
    const defaultCenter: [number, number] = [10.8231, 106.6297];
    const center: [number, number] = initialLat && initialLng ? [initialLat, initialLng] : defaultCenter;

    const [position, setPosition] = useState<[number, number]>(center);
    const markerRef = useRef<any>(null);

    useEffect(() => {
        if (initialLat && initialLng) {
            setPosition([initialLat, initialLng]);
        }
    }, [initialLat, initialLng]);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const latLng = marker.getLatLng();
                    setPosition([latLng.lat, latLng.lng]);
                    if (onLocationChange) {
                        onLocationChange(latLng.lat, latLng.lng);
                    }
                }
            },
        }),
        [onLocationChange],
    );

    return {
        center,
        position,
        markerRef,
        eventHandlers
    };
};
