import type { Lang } from './types';

/** نوع نقطه روی نقشه */
export type MapKind = 'village' | 'ancient' | 'fun' | 'hub';

export interface MapPoint {
  id: string;
  kind: MapKind;
  lat: number;
  lon: number;
  /** ستون برچسب در نقشه دسکتاپ: چپ یا راست */
  side?: 'L' | 'R';
  /** ارتفاع برچسب (y در viewBox) */
  ly?: number;
  name: Record<Lang, string>;
}

/** مرکز نقشه: روستای هلیله */
export const HELILEH = { lat: 28.8539, lon: 50.8716 };

export const mapPoints: MapPoint[] = [
  { id: 'bushehr', kind: 'hub', lat: 28.9862, lon: 50.8318, side: 'L', ly: 120, name: { fa: 'شهر بوشهر (بازار)', en: 'Bushehr city (bazaar)', ru: 'Бушер (базар)' } },
  { id: 'port', kind: 'hub', lat: 28.9704, lon: 50.8573, side: 'R', ly: 141, name: { fa: 'بندر بوشهر', en: 'Bushehr port', ru: 'Порт Бушера' } },
  { id: 'shoghab', kind: 'ancient', lat: 28.9164, lon: 50.8138, side: 'L', ly: 215, name: { fa: 'گورستان باستانی شغاب', en: 'Shoghab ancient cemetery', ru: 'Некрополь Шогаб' } },
  { id: 'rishehr', kind: 'fun', lat: 28.8975, lon: 50.8304, side: 'L', ly: 258, name: { fa: 'ساحل ریشهر', en: 'Rishehr beach', ru: 'Пляж Ришехр' } },
  { id: 'masileh', kind: 'fun', lat: 28.8741, lon: 50.8933, side: 'R', ly: 245, name: { fa: 'مسیله (شوره‌زار) هلیله', en: 'Helileh salt marsh', ru: 'Солончак Хелиле' } },
  { id: 'lian', kind: 'fun', lat: 28.8608, lon: 50.8535, side: 'L', ly: 305, name: { fa: 'پارک ساحلی لیان', en: 'Lian beach park', ru: 'Парк Лиан' } },
  { id: 'beach', kind: 'fun', lat: 28.8367, lon: 50.8745, side: 'L', ly: 352, name: { fa: 'ساحل هلیله', en: 'Helileh beach', ru: 'Пляж Хелиле' } },
  { id: 'npp', kind: 'hub', lat: 28.8298, lon: 50.886, side: 'R', ly: 345, name: { fa: 'نیروگاه اتمی بوشهر', en: 'Bushehr nuclear plant', ru: 'АЭС «Бушер»' } },
  { id: 'nppbeach', kind: 'fun', lat: 28.8229, lon: 50.9182, side: 'R', ly: 390, name: { fa: 'ساحل شنای نیروگاه', en: 'Power plant beach', ru: 'Пляж у АЭС' } },
  { id: 'delvar', kind: 'hub', lat: 28.7614, lon: 51.07, side: 'R', ly: 452, name: { fa: 'دلوار', en: 'Delvar', ru: 'Дельвар' } },
];

export interface MapStrings {
  title: string;
  lead: string;
  note: string;
  center: string;
  km: string;
  kinds: Record<MapKind, string>;
  openGoogle: string;
  aria: string;
  listTitle: string;
  listCenter: string;
}

export const mapStrings: Record<Lang, MapStrings> = {
  fa: {
    title: 'نقشه هلیله و اطراف',
    lead: 'جانمایی روستای هلیله، گورستان باستانی شغاب، نقاط تفریحی و فاصله تا بوشهر، بندر، نیروگاه و دلوار.',
    note: 'فاصله‌ها به‌صورت خط مستقیم و تقریبی‌اند؛ مسیر جاده‌ای کمی بیشتر است.',
    center: 'روستای هلیله',
    km: 'کیلومتر',
    kinds: { village: 'هلیله', ancient: 'گورستان باستانی', fun: 'تفریحی و ساحلی', hub: 'شهر، بندر، نیروگاه، دلوار' },
    openGoogle: 'باز کردن در گوگل‌مپ',
    aria: 'نقشه شماتیک هلیله با فاصله تا بوشهر، بندر، نیروگاه و دلوار',
    listTitle: 'فاصله از هلیله',
    listCenter: 'مرکز نقشه',
  },
  en: {
    title: 'Map of Helileh and surroundings',
    lead: 'Helileh village, the Shoghab ancient cemetery, leisure spots, and distances to Bushehr, the port, the power plant and Delvar.',
    note: 'Distances are approximate straight-line values; by road they are somewhat longer.',
    center: 'Helileh village',
    km: 'km',
    kinds: { village: 'Helileh', ancient: 'Ancient cemetery', fun: 'Leisure and beaches', hub: 'City, port, plant, Delvar' },
    openGoogle: 'Open in Google Maps',
    aria: 'Schematic map of Helileh with distances to Bushehr, the port, the power plant and Delvar',
    listTitle: 'Distance from Helileh',
    listCenter: 'map center',
  },
  ru: {
    title: 'Карта Хелиле и окрестностей',
    lead: 'Деревня Хелиле, древний некрополь Шогаб, места отдыха и расстояния до Бушера, порта, АЭС и Дельвара.',
    note: 'Расстояния приблизительные, по прямой; по дороге путь немного длиннее.',
    center: 'Деревня Хелиле',
    km: 'км',
    kinds: { village: 'Хелиле', ancient: 'Древний некрополь', fun: 'Отдых и пляжи', hub: 'Город, порт, АЭС, Дельвар' },
    openGoogle: 'Открыть в Google Maps',
    aria: 'Схематичная карта Хелиле с расстояниями до Бушера, порта, АЭС и Дельвара',
    listTitle: 'Расстояние от Хелиле',
    listCenter: 'центр карты',
  },
};
