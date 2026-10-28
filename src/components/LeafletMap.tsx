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
        zoomSnap: 0.25,
        zoomDelta: 0.5,
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution,
      }).addTo(map);

      // روی صفحه‌های باریک نشانگرها کوچک‌ترند تا نقاط نزدیک (مثل پارک و ساحل) روی هم نیفتند
      const narrow = window.innerWidth < 760;
      const size = window.innerWidth < 360 ? 20 : narrow ? 24 : 28;
      const csize = narrow ? 34 : 38;
      const local: [number, number][] = [[center.lat, center.lon]];
      const all: [number, number][] = [[center.lat, center.lon]];
      pins.forEach((p) => {
        const isCenter = p.id === 'village';
        const icon = L.divIcon({
          className: 'hm-pin-wrap',
          html: `<span class="hm-pin hm-${p.kind}${isCenter ? ' hm-pin-center' : ''}"><b>${p.mark}</b></span>`,
          iconSize: isCenter ? [csize, csize] : [size, size],
          iconAnchor: isCenter ? [csize / 2, csize / 2] : [size / 2, size / 2],
          popupAnchor: [0, isCenter ? -csize / 2 : -size / 2],
        });
        const m = L.marker([p.lat, p.lon], { icon, title: p.label, riseOnHover: true, zIndexOffset: isCenter ? 1000 : 0 }).addTo(map);
        m.bindPopup(`<div dir="${dir}" lang="${lang}" class="hm-popup">${p.popup}</div>`);
        all.push([p.lat, p.lon]);
        if (p.scope === 'local') local.push([p.lat, p.lon]);
      });

      boundsRef.current = { village: L.latLngBounds(local), region: L.latLngBounds(all).pad(0.1) };
      map.fitBounds(boundsRef.current.village, { maxZoom: 17, padding: [22, 22] });
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
    if (mapRef.current && b) mapRef.current.fitBounds(b[v], { animate: true, maxZoom: v === 'village' ? 17 : 15, padding: v === 'village' ? [22, 22] : [10, 10] });
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
