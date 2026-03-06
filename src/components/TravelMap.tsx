import { useMemo } from 'react';
import { MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useTheme } from 'next-themes';
import type { LatLngTuple } from '@/data/geo';

export interface MapMarker {
  id: string;
  label: string;
  position: LatLngTuple;
  description?: string;
}

interface TravelMapProps {
  center: LatLngTuple;
  zoom?: number;
  markers: MapMarker[];
  route?: LatLngTuple[];
  heightClassName?: string;
}

const markerIcon = divIcon({
  className: '',
  html: '<div class="holiday-marker" />',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const TravelMap = ({
  center,
  zoom = 6,
  markers,
  route,
  heightClassName = 'h-[420px]',
}: TravelMapProps) => {
  const { theme } = useTheme();

  const tileUrl = useMemo(
    () =>
      theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    [theme],
  );

  return (
    <div className={`rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl ${heightClassName}`}>
      <MapContainer center={center} zoom={zoom} className="w-full h-full z-0" scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url={tileUrl}
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={markerIcon}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold text-sm">{marker.label}</p>
                {marker.description && <p className="text-xs text-gray-600">{marker.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {route && route.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: '#0ea5e9',
              weight: 4,
              opacity: 0.9,
              dashArray: '10 8',
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default TravelMap;
