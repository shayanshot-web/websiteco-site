'use client';

import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LMap, LatLngBoundsExpression } from 'leaflet';

export interface PinData {
  id: string;
  kind: string;
  lat: number;
  lon: number;
  label: string;
  /** شماره روی نشانگر؛ برای مرکز روستا ستاره */
  mark: string;
  popup: string;
  scope: 'local' | 'region';
}

interface Props {
  center: { lat: number; lon: number };
  pins: PinData[];
  dir: 'rtl' | 'ltr';
  lang: string;
  ariaLabel: string;
  centerLabel: string;
  viewVillage: string;
  viewRegion: string;
  attribution: string;
}

export default function LeafletMap({ center, pins, dir, lang, ariaLabel, centerLabel, viewVillage, viewRegion, attribution }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const boundsRef = useRef<{ village: LatLngBoundsExpression; region: LatLngBoundsExpression } | null>(null);
  const [view, setView] = useState<'village' | 'region'>('village');

  useEffect(() => {
    let disposed = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (disposed || !elRef.current) return;

      const map = L.map(elRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution,
      }).addTo(map);

      const local: [number, number][] = [[center.lat, center.lon]];
      const all: [number, number][] = [[center.lat, center.lon]];
      pins.forEach((p) => {
        const isCenter = p.id === 'village';
        const icon = L.divIcon({
          className: 'hm-pin-wrap',
          html: `<span class="hm-pin hm-${p.kind}${isCenter ? ' hm-pin-center' : ''}"><b>${p.mark}</b></span>`,
          iconSize: isCenter ? [38, 38] : [28, 28],
          iconAnchor: isCenter ? [19, 19] : [14, 14],
          popupAnchor: [0, isCenter ? -18 : -14],
        });
        const m = L.marker([p.lat, p.lon], { icon, title: p.label, riseOnHover: true, zIndexOffset: isCenter ? 1000 : 0 }).addTo(map);
        m.bindPopup(`<div dir="${dir}" lang="${lang}" class="hm-popup">${p.popup}</div>`);
        all.push([p.lat, p.lon]);
        if (p.scope === 'local') local.push([p.lat, p.lon]);
      });

      boundsRef.current = { village: L.latLngBounds(local).pad(0.18), region: L.latLngBounds(all).pad(0.1) };
      map.fitBounds(boundsRef.current.village);
    })();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center, pins, dir, lang, attribution]);

  const go = (v: 'village' | 'region') => {
    setView(v);
    const b = boundsRef.current;
    if (mapRef.current && b) mapRef.current.fitBounds(b[v], { animate: true });
  };

  return (
    <div className="hm-map-wrap">
      <div className="hm-toggle" role="group" aria-label={centerLabel}>
        <button type="button" className={view === 'village' ? 'is-active' : ''} aria-pressed={view === 'village'} onClick={() => go('village')}>
          {viewVillage}
        </button>
        <button type="button" className={view === 'region' ? 'is-active' : ''} aria-pressed={view === 'region'} onClick={() => go('region')}>
          {viewRegion}
        </button>
      </div>
      <div ref={elRef} className="hm-map" role="region" aria-label={ariaLabel} />
    </div>
  );
}
