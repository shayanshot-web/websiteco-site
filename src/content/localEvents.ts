import type { Lang } from './types';

/**
 * رویدادهای هلیله (بالای تقویم باستانی).
 * برای عکس واقعی: فایل را در public/events/ بگذارید و نامش را در photo بنویسید؛ تا آن زمان تصویر گرافیکی نمایش داده می‌شود.
 */
export type EventArtName = 'sport' | 'grigsho' | 'barat' | 'kolun' | 'domad' | 'theater';

interface Tx {
  title: string;
  desc: string;
  date: string;
  time: string;
  place: string;
}

export interface LocalEvent {
  id: string;
  art: EventArtName;
  /** رویداد با تقویم قمری (تاریخ خورشیدی‌اش هر سال جابه‌جا می‌شود) */
  lunar?: boolean;
  /** بازهٔ چندروزه یا ماهانه */
  span?: boolean;
  photo?: string;
  t: Record<Lang, Tx>;
}

export const localEvents: LocalEvent[] = [
  {
    id: 'sport',
    art: 'sport',
    span: true,
    t: {
      fa: { title: 'رویداد ورزشی اردیبهشت', desc: 'برنامهٔ ورزشی یک‌ماهه در زمین چمن ساحلی هلیله؛ غروب‌ها به ساحل بیایید. [شرح رشته‌ها و برنامه: از مدیریت تکمیل شود]', date: '۱ تا ۳۰ اردیبهشت', time: 'غروب', place: 'زمین چمن ساحلی' },
      en: { title: 'Ordibehesht sports event', desc: 'A month of sport on Helileh\'s beach grass pitch; come to the shore at sunset. [Disciplines and schedule: to be completed]', date: '1–30 Ordibehesht', time: 'Sunset', place: 'Beach grass pitch' },
      ru: { title: 'Спортивное событие ордибехешта', desc: 'Месяц спорта на пляжном травяном поле Хелиле; приходите на берег на закате. [Виды спорта и программа: дополнить]', date: '1–30 ордибехешта', time: 'Закат', place: 'Пляжное травяное поле' },
    },
  },
  {
    id: 'grigsho',
    art: 'grigsho',
    lunar: true,
    t: {
      fa: { title: 'گریگشو', desc: 'شادی کودکان در نیمهٔ ماه رمضان؛ غروب ۱۵ رمضان در همهٔ محله‌های هلیله. آیین‌هایی مشابه، مانند «گرگیعان»، در نیمهٔ رمضان در کرانهٔ خلیج فارس رواج دارد. [شرح آیین در هلیله: از بزرگان روستا تکمیل شود]', date: '۱۵ رمضان', time: 'غروب', place: 'کل محله هلیله' },
      en: { title: 'Grigsho', desc: 'A children\'s celebration at mid-Ramadan, at sunset on 15 Ramadan across all of Helileh. Similar customs, such as "Gargi\'an", are known along the Persian Gulf coast in mid-Ramadan. [How it is held in Helileh: to be added by village elders]', date: '15 Ramadan', time: 'Sunset', place: 'Whole Helileh quarter' },
      ru: { title: 'Григ-шо', desc: 'Детский праздник в середине рамадана, на закате 15 рамазана во всех кварталах Хелиле. Похожие обычаи, например «Гаргиан», известны на побережье Персидского залива в середине рамадана. [Как это проходит в Хелиле: дополнят старейшины деревни]', date: '15 рамазана', time: 'Закат', place: 'Весь квартал Хелиле' },
    },
  },
  {
    id: 'barat',
    art: 'barat',
    lunar: true,
    t: {
      fa: { title: 'نیمه برات', desc: 'نیمهٔ شعبان، شب برات و سالروز ولادت امام زمان (عج) نزد شیعیان؛ عصر ۱۵ شعبان در سراسر محلهٔ هلیله. [شرح برنامهٔ محلی: تکمیل شود]', date: '۱۵ شعبان', time: 'عصر', place: 'کل محله هلیله' },
      en: { title: 'Nimeh Barat', desc: 'Mid-Sha\'ban, the Night of Bara\'at and, for Shia Muslims, the birth anniversary of the 12th Imam; in the afternoon of 15 Sha\'ban across the Helileh quarter. [Local programme: to be completed]', date: '15 Sha\'ban', time: 'Afternoon', place: 'Whole Helileh quarter' },
      ru: { title: 'Ниме-барат', desc: 'Середина шабана — Ночь Бараат и день рождения двенадцатого имама у шиитов; после полудня 15 шабана во всём квартале Хелиле. [Местная программа: дополнить]', date: '15 шабана', time: 'После полудня', place: 'Весь квартал Хелиле' },
    },
  },
  {
    id: 'kolun',
    art: 'kolun',
    t: {
      fa: { title: 'کلون', desc: 'آیینی یک‌روزه در بافت قدیم هلیله، از صبح تا عصر؛ فرصتی برای قدم‌زدن میان خانه‌ها و کوچه‌های قدیم. [شرح آیین: از بزرگان روستا تکمیل شود]', date: 'آذرماه', time: 'صبح تا عصر', place: 'بافت قدیم هلیله' },
      en: { title: 'Kolun', desc: 'A one-day event in Helileh\'s old quarter from morning to afternoon; a chance to walk among the old houses and lanes. [About the custom: to be added by village elders]', date: 'Azar', time: 'Morning to afternoon', place: 'Helileh old quarter' },
      ru: { title: 'Колун', desc: 'Однодневное событие в старом квартале Хелиле с утра до вечера; возможность пройтись среди старых домов и переулков. [Об обычае: дополнят старейшины деревни]', date: 'месяц азар', time: 'С утра до вечера', place: 'Старый квартал Хелиле' },
    },
  },
  {
    id: 'domad',
    art: 'domad',
    t: {
      fa: { title: 'دوماد سر رود', desc: 'عروسی قدیمی هلیله، عصر یک روز از بهمن‌ماه در میدان پریزاد. [شرح مراسم: از بزرگان روستا تکمیل شود]', date: 'بهمن‌ماه', time: 'عصر', place: 'میدان پریزاد هلیله' },
      en: { title: 'Domad Sar Rood', desc: 'An old Helileh wedding, held on an afternoon in Bahman at Parizad square. [About the ceremony: to be added by village elders]', date: 'Bahman', time: 'Afternoon', place: 'Parizad square, Helileh' },
      ru: { title: 'Домад-сар-руд', desc: 'Старинная свадьба Хелиле, проходит в один из дней бахмана после полудня на площади Паризад. [О церемонии: дополнят старейшины деревни]', date: 'месяц бахман', time: 'После полудня', place: 'Площадь Паризад, Хелиле' },
    },
  },
  {
    id: 'theater',
    art: 'theater',
    span: true,
    t: {
      fa: { title: 'تیاتر ساحلی', desc: 'پنج روز نمایش در تیاتر ساحلی ایرج صغیری، درست کنار دریا. [برنامهٔ نمایش‌ها: تکمیل شود]', date: '۲۵ تا ۲۹ بهمن', time: 'عصر', place: 'تیاتر ساحلی ایرج صغیری' },
      en: { title: 'Beach theater', desc: 'Five days of performances at the Iraj Soghayri beach theater, right by the sea. [Programme: to be completed]', date: '25–29 Bahman', time: 'Afternoon', place: 'Iraj Soghayri beach theater' },
      ru: { title: 'Пляжный театр', desc: 'Пять дней спектаклей в пляжном театре Ираджа Согейри, прямо у моря. [Программа: дополнить]', date: '25–29 бахмана', time: 'После полудня', place: 'Пляжный театр Ираджа Согейри' },
    },
  },
];

export const localEventsUi: Record<
  Lang,
  { title: string; lead: string; cols: { event: string; date: string; time: string; place: string; entry: string }; free: string; organizer: string; community: string; lunar: string; photoSoon: string; source: string; sourceUrl: string }
> = {
  fa: { title: 'رویدادهای هلیله', lead: 'آیین‌ها و برنامه‌هایی که هر سال در هلیله برگزار می‌شود؛ همه رایگان و به همت مردم.', cols: { event: 'رویداد', date: 'تاریخ', time: 'ساعت', place: 'مکان', entry: 'ورودی' }, free: 'رایگان', organizer: 'برگزارکننده', community: 'مردمی', lunar: 'تاریخ قمری', photoSoon: 'عکس به‌زودی', source: 'دربارهٔ نیمهٔ شعبان', sourceUrl: 'https://en.wikipedia.org/wiki/Mid-Sha%27ban' },
  en: { title: 'Helileh events', lead: 'Rituals and programmes held in Helileh every year, all free and run by the community.', cols: { event: 'Event', date: 'Date', time: 'Time', place: 'Place', entry: 'Entry' }, free: 'Free', organizer: 'Organiser', community: 'Community', lunar: 'Lunar date', photoSoon: 'Photo soon', source: 'About Mid-Sha\'ban', sourceUrl: 'https://en.wikipedia.org/wiki/Mid-Sha%27ban' },
  ru: { title: 'События Хелиле', lead: 'Обряды и программы, которые проходят в Хелиле каждый год; всё бесплатно и силами жителей.', cols: { event: 'Событие', date: 'Дата', time: 'Время', place: 'Место', entry: 'Вход' }, free: 'Бесплатно', organizer: 'Организатор', community: 'Жители', lunar: 'Лунная дата', photoSoon: 'Фото скоро', source: 'О середине шабана', sourceUrl: 'https://en.wikipedia.org/wiki/Mid-Sha%27ban' },
};
