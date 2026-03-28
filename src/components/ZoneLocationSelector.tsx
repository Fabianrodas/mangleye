import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { zones, type Zone } from "@/data/zones";
import { MapPin } from "lucide-react";

export type LocationMode = "existing" | "new";

export interface MapPoint {
    lat: number;
    lng: number;
}

interface ZoneLocationSelectorProps {
    mode: LocationMode;
    selectedZoneId: string;
    selectedPoint: MapPoint | null;
    onModeChange: (mode: LocationMode) => void;
    onZoneChange: (zoneId: string) => void;
    onPointChange: (point: MapPoint) => void;
    error?: string;
    accentClassName?: string;
}

const guayaquilCenter: [number, number] = [-2.18, -79.92];

function distanceSq(aLat: number, aLng: number, bLat: number, bLng: number) {
    return (aLat - bLat) ** 2 + (aLng - bLng) ** 2;
}

export function getNearestPriorityZone(point: MapPoint): Zone {
    const sortedByPriority = [...zones].sort((a, b) => b.priorityScore - a.priorityScore);
    let nearestZone = sortedByPriority[0];
    let nearestDistance = distanceSq(point.lat, point.lng, nearestZone.lat, nearestZone.lng);

    sortedByPriority.slice(1).forEach((zone) => {
        const currentDistance = distanceSq(point.lat, point.lng, zone.lat, zone.lng);
        if (currentDistance < nearestDistance) {
            nearestDistance = currentDistance;
            nearestZone = zone;
        }
    });

    return nearestZone;
}

export default function ZoneLocationSelector({
    mode,
    selectedZoneId,
    selectedPoint,
    onModeChange,
    onZoneChange,
    onPointChange,
    error,
    accentClassName = "border-primary/40 text-primary",
}: ZoneLocationSelectorProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.CircleMarker | null>(null);

    const sortedZones = useMemo(
        () => [...zones].sort((a, b) => b.priorityScore - a.priorityScore),
        []
    );

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: guayaquilCenter,
            zoom: 12,
            zoomControl: true,
            attributionControl: true,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19,
        }).addTo(map);

        map.on("click", (event: L.LeafletMouseEvent) => {
            const nextPoint = { lat: event.latlng.lat, lng: event.latlng.lng };
            onPointChange(nextPoint);
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, [onPointChange]);

    useEffect(() => {
        if (!mapRef.current) return;

        if (mode === "new") {
            setTimeout(() => {
                mapRef.current?.invalidateSize();
            }, 50);
        }
    }, [mode]);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!selectedPoint) {
            if (markerRef.current) {
                markerRef.current.remove();
                markerRef.current = null;
            }
            return;
        }

        if (!markerRef.current) {
            markerRef.current = L.circleMarker([selectedPoint.lat, selectedPoint.lng], {
                radius: 8,
                color: "hsl(159, 80%, 32%)",
                fillColor: "hsl(159, 80%, 32%)",
                fillOpacity: 0.7,
                weight: 2,
            }).addTo(mapRef.current);
        } else {
            markerRef.current.setLatLng([selectedPoint.lat, selectedPoint.lng]);
        }

        mapRef.current.flyTo([selectedPoint.lat, selectedPoint.lng], Math.max(mapRef.current.getZoom(), 13), {
            duration: 0.7,
        });
    }, [selectedPoint]);

    const nearestZone = selectedPoint ? getNearestPriorityZone(selectedPoint) : null;

    return (
        <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground block">Location</label>

            <div className="grid grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={() => onModeChange("existing")}
                    className={`px-3 py-2.5 text-xs font-semibold rounded-xl border transition-all ${mode === "existing" ? accentClassName + " bg-primary/10" : "border-border/40 bg-white hover:bg-secondary/40"
                        }`}
                >
                    Select Existing Zone
                </button>
                <button
                    type="button"
                    onClick={() => onModeChange("new")}
                    className={`px-3 py-2.5 text-xs font-semibold rounded-xl border transition-all ${mode === "new" ? accentClassName + " bg-primary/10" : "border-border/40 bg-white hover:bg-secondary/40"
                        }`}
                >
                    Select New Zone (Map)
                </button>
            </div>

            {mode === "existing" ? (
                <div className="space-y-2">
                    <select
                        value={selectedZoneId}
                        onChange={(event) => onZoneChange(event.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border border-border/60 focus:border-primary/50 transition-all"
                    >
                        <option value="">Select existing zone</option>
                        {sortedZones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name} · Priority {zone.priorityScore}
                            </option>
                        ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground">
                        Links your report directly to an existing priority zone.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="rounded-xl overflow-hidden border border-border/50">
                        <div ref={mapContainerRef} className="h-56 w-full" />
                    </div>

                    {selectedPoint ? (
                        <div className="rounded-lg bg-secondary/30 p-2.5 text-[11px] space-y-1">
                            <div className="flex items-center gap-1.5 text-foreground font-medium">
                                <MapPin size={12} />
                                Selected: {selectedPoint.lat.toFixed(5)}, {selectedPoint.lng.toFixed(5)}
                            </div>
                            {nearestZone && (
                                <div className="text-muted-foreground">
                                    Nearest priority zone: <span className="font-medium text-foreground">{nearestZone.name}</span> (score {nearestZone.priorityScore})
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-[11px] text-muted-foreground">Click on the map to select a new location.</p>
                    )}
                </div>
            )}

            {error && <p className="text-[11px] text-destructive">{error}</p>}
        </div>
    );
}
