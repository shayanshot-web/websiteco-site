import type { Lang } from './types';

/* تقویم هلیله: بادهای محلی و جشن‌های ایران باستان (تاریخ‌ها به تقویم خورشیدی/جلالی) */

export type CalKind = 'wind' | 'ancient';

interface Tx {
  title: string;
  desc: string;
}

export interface CalEntry {
  id: string;
  kind: CalKind;
  m: number; // ماه ۱ تا ۱۲
  d1: number;
  d2?: number;
  /** پایان بازه، وقتی بازه از ماه دیگری تمام می‌شود (ممکن است به سال بعد برسد) */
  end?: [number, number];
  /** تاریخ متحرک یا تقریبی که به‌صورت متن می‌آید */
  label?: Record<Lang, string>;
  /** کلید منبع‌ها در sources */
  src?: string[];
  t: Record<Lang, Tx>;
}

export const monthNames: Record<Lang, string[]> = {
  fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  en: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
  ru: ['Фарвардин', 'Ордибехешт', 'Хордад', 'Тир', 'Мордад', 'Шахривар', 'Мехр', 'Абан', 'Азар', 'Дей', 'Бахман', 'Эсфанд'],
};

export const gregMonths: Record<Lang, string[]> = {
  fa: ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
};

export const sources: Record<string, { url?: string; name: Record<Lang, string> }> = {
  local: {
    name: { fa: 'روایت اهالی هلیله', en: 'Helileh locals’ accounts', ru: 'Рассказы жителей Хелилы' },
  },
  kanin: {
    url: 'https://persiangulf1382.blogfa.com/post/149',
    name: {
      fa: 'عبدالحسین کنین، «جغرافیای استان بوشهر» (به نقل از بلاگ خلیج فارس)',
      en: 'A. Kanin, “Geography of Bushehr Province” (via the Persian Gulf 1382 blog)',
      ru: 'А. Канин, «География провинции Бушер» (по блогу «Персидский залив 1382»)',
    },
  },
  limar: {
    url: 'https://nasirboushehronline.ir/%D8%B6%D8%B1%D8%A8%D9%87%D9%84%D8%AD%DB%8C%D9%85%D8%B1%D8%8C%D9%84%DB%8C%D9%85%D8%B1%D8%8C%D9%84%D9%87%DB%8C%D9%85%D8%B1%D8%8C%D9%84%D8%AD%D9%85%DB%8C%D8%B1/',
    name: {
      fa: 'ناصر بوشهر آنلاین: ضربهٔ لحیمر، به نقل از ناخدایان',
      en: 'Nasir Bushehr Online: the Lahimar “strike”, as told by captains',
      ru: 'Nasir Bushehr Online: «удар» лахимара со слов капитанов',
    },
  },
  pilot: {
    url: 'https://www.globalsecurity.org/military/world/iran/shamal.htm',
    name: {
      fa: 'GlobalSecurity: «Persian Gulf Weather: Shamal» (راهنمای دریانوردی خلیج فارس)',
      en: 'GlobalSecurity: “Persian Gulf Weather: Shamal” (sailing directions)',
      ru: 'GlobalSecurity: «Persian Gulf Weather: Shamal» (лоция)',
    },
  },
  wiki: {
    url: 'https://en.wikipedia.org/wiki/Shamal_(wind)',
    name: { fa: 'ویکی‌پدیا: Shamal (wind)', en: 'Wikipedia: Shamal (wind)', ru: 'Wikipedia: Shamal (wind)' },
  },
  jphgr: {
    url: 'https://jphgr.ut.ac.ir/article_57033_en.html',
    name: {
      fa: 'پژوهش‌های جغرافیای طبیعی (دانشگاه تهران)، دورهٔ ۴۸، شمارهٔ ۱، بهار ۱۳۹۵: باد شمال در بوشهر',
      en: 'Physical Geography Research (University of Tehran) 48(1), spring 2016: Shamal wind at Bushehr',
      ru: 'Physical Geography Research (Тегеранский университет) 48(1), весна 2016: ветер шамаль у Бушера',
    },
  },
};

export const calUi: Record<
  Lang,
  {
    title: string;
    lead: string;
    windsTitle: string;
    windsLead: string;
    tableTitle: string;
    colDate: string;
    colEvent: string;
    colAbout: string;
    kindWind: string;
    kindAncient: string;
    knownAs: string;
    chartTitle: string;
    chartLead: string;
    sourceLabel: string;
    seasonLabels: string[];
    note: string;
  }
> = {
  fa: {
    title: 'تقویم هلیله',
    lead: 'بادهای دریا و جشن‌های کهن ایرانی، ماه به ماه؛ برای برنامه‌ریزی سفر، ماهیگیری و دیدار از هلیله.',
    windsTitle: 'بادهای بوشهر و خلیج فارس',
    windsLead:
      'مردم ساحل بوشهر روزگاری زمان کار دریا را با باد می‌سنجیدند. نخست دو باد پاییزیِ هلیله را بشناسید و با هم اشتباه نگیرید؛ سپس بادهای دیگر خلیج فارس را با بازهٔ زمانی و منبع ببینید.',
    tableTitle: 'تقویم سال',
    colDate: 'تاریخ',
    colEvent: 'مناسبت',
    colAbout: 'دربارهٔ آن',
    kindWind: 'باد محلی',
    kindAncient: 'ایران باستان',
    knownAs: 'با نام‌های',
    chartTitle: 'نمودار بادها در طول سال',
    chartLead: 'هر نوار، بازهٔ وزش یک باد را نشان می‌دهد. باد دریا هر سال اندکی جابه‌جا می‌شود.',
    sourceLabel: 'منبع',
    seasonLabels: ['بهار', 'تابستان', 'پاییز', 'زمستان'],
    note: 'تاریخ بادهای محلی بر پایهٔ روایت دریانوردان است و هر سال چند روز جابه‌جا می‌شود. پیش از رفتن به دریا، هشدار هواشناسی دریایی را ببینید. تاریخ میلادی تقریبی است.',
  },
  en: {
    title: 'Helileh calendar',
    lead: 'Sea winds and ancient Iranian festivals, month by month: handy for planning a trip, a fishing day or a visit to Helileh.',
    windsTitle: 'Winds of Bushehr and the Persian Gulf',
    windsLead:
      'On the Bushehr coast, sailors once read the season from the wind. Meet Helileh’s two autumn winds and learn to tell them apart, then see the other winds of the Gulf with their usual dates and sources.',
    tableTitle: 'The year at a glance',
    colDate: 'Date',
    colEvent: 'Occasion',
    colAbout: 'About',
    kindWind: 'Local wind',
    kindAncient: 'Ancient Iran',
    knownAs: 'Also called',
    chartTitle: 'Winds through the year',
    chartLead: 'Each bar shows when a wind usually blows. Sea winds shift a little from year to year.',
    sourceLabel: 'Source',
    seasonLabels: ['Spring', 'Summer', 'Autumn', 'Winter'],
    note: 'Wind dates follow sailors’ tradition and shift by a few days each year. Check the marine forecast before going to sea. Gregorian dates are approximate.',
  },
  ru: {
    title: 'Календарь Хелилы',
    lead: 'Морские ветры и древние иранские праздники по месяцам: удобно для планирования поездки, рыбалки или визита в Хелилу.',
    windsTitle: 'Ветры Бушера и Персидского залива',
    windsLead:
      'На побережье Бушера моряки когда-то читали сезон по ветру. Познакомьтесь с двумя осенними ветрами Хелилы и научитесь их различать, затем посмотрите остальные ветры Залива с обычными датами и источниками.',
    tableTitle: 'Год в таблице',
    colDate: 'Дата',
    colEvent: 'Событие',
    colAbout: 'О чём',
    kindWind: 'Местный ветер',
    kindAncient: 'Древний Иран',
    knownAs: 'Также называют',
    chartTitle: 'Ветры в течение года',
    chartLead: 'Каждая полоса показывает, когда обычно дует ветер. Морские ветры год от года немного сдвигаются.',
    sourceLabel: 'Источник',
    seasonLabels: ['Весна', 'Лето', 'Осень', 'Зима'],
    note: 'Даты ветров основаны на традиции моряков и каждый год сдвигаются на несколько дней. Перед выходом в море смотрите морской прогноз. Григорианские даты приблизительные.',
  },
};

export const windMeta: Record<Lang, Record<string, { aka: string; tip: string; strength: string; dateNote: string }>> = {
  fa: {
    lakizab: {
      aka: 'لکیذب، لچیذب (لپچزب)، «باد گول‌زن»',
      tip: 'نشانهٔ تشخیص: وزشش کوتاه است و زود فروکش می‌کند؛ لیمهر ماندگارتر است و چند روز دریا را به هم می‌ریزد.',
      strength: 'خفیف',
      dateNote: 'تاریخ مهر روایت اهالی هلیله است؛ در منبع مکتوب (کنین) باد مشابهی با نام‌های «لپچزب / الکیزب / گول‌زن» در ۱۵ تا ۲۵ آبان آمده است.',
    },
    limehr: {
      aka: 'لیمهر، لیمر، لحیمر، لهیمر',
      tip: 'پیش از وزش، ابرهای عمودی و تغییر ناگهانی هوا دیده می‌شود. دو سه روز اول را به دریا نزنید؛ بعد از فروکش‌کردن، دریا معمولاً پرصید است.',
      strength: 'تند',
      dateNote: 'تاریخ ۲۳ تا ۲۸ آبان روایت اهالی هلیله است؛ در منابع مکتوب (کنین و ناخدایان) آغاز آن حدود ۱۵ آبان و تا نیمهٔ دوم آبان گفته شده و هر سال جابه‌جا می‌شود.',
    },
  },
  en: {
    lakizab: {
      aka: 'Lakizab, Lachizab (Lapchazb), “the fooling wind”',
      tip: 'How to tell it apart: it blows briefly and dies down soon, while Limehr lingers and unsettles the sea for days.',
      strength: 'Mild',
      dateNote: 'The Mehr dates are the Helileh locals’ account; a written source (Kanin) places a similar wind, called “Lapchazb / Alkizab / Gulzan”, on 15–25 Aban.',
    },
    limehr: {
      aka: 'Limehr, Limar, Lahimar, Lahaymar',
      tip: 'Before it arrives, tall vertical clouds and sudden changes in the weather are common signs. Keep boats ashore for the first days; fishing is often rich once it passes.',
      strength: 'Strong',
      dateNote: 'The 23–28 Aban dates are the Helileh locals’ account; written sources (Kanin, and captains) put its start around 15 Aban and into the second half of the month, and it shifts each year.',
    },
  },
  ru: {
    lakizab: {
      aka: 'Лякизаб, Лачизаб (Лапчазб), «обманный ветер»',
      tip: 'Как отличить: он дует недолго и быстро стихает, а лимехр держится и тревожит море несколько дней.',
      strength: 'Слабый',
      dateNote: 'Даты в Мехре — рассказ жителей Хелилы; письменный источник (Канин) относит похожий ветер «лапчазб / алькизб / гулзан» к 15–25 абана.',
    },
    limehr: {
      aka: 'Лимехр, Лимар, Лахимар',
      tip: 'Перед приходом часто видны высокие вертикальные облака и резкая смена погоды. Первые дни лучше не выходить в море; после он стихает, и лов обычно богатый.',
      strength: 'Сильный',
      dateNote: 'Даты 23–28 абана — рассказ жителей Хелилы; письменные источники (Канин и капитаны) относят его начало примерно к 15 абана и дальше во второй половине месяца, и он каждый год сдвигается.',
    },
  },
};

export const entries: CalEntry[] = [
  {
    id: 'nowruz',
    kind: 'ancient',
    m: 1,
    d1: 1,
    t: {
      fa: { title: 'نوروز', desc: 'آغاز سال نو و نخستین روز بهار؛ کهن‌ترین جشن ایرانی، با سفرهٔ هفت‌سین و دید و بازدید.' },
      en: { title: 'Nowruz', desc: 'The new year and first day of spring: Iran’s oldest festival, with the haft-sin table and family visits.' },
      ru: { title: 'Новруз', desc: 'Новый год и первый день весны: древнейший иранский праздник со столом хафт-син и семейными визитами.' },
    },
  },
  {
    id: 'sizdah',
    kind: 'ancient',
    m: 1,
    d1: 13,
    t: {
      fa: { title: 'سیزده‌به‌در', desc: 'روز بیرون‌رفتن به دامن طبیعت؛ ساحل هلیله جای خوبی برای این روز است.' },
      en: { title: 'Sizdah Bedar', desc: 'The day to head out into nature at the end of Nowruz; Helileh’s shore is a lovely place for it.' },
      ru: { title: 'Сиздах-бедар', desc: 'День выезда на природу в конце Новруза; побережье Хелилы для этого прекрасно подходит.' },
    },
  },
  {
    id: 'farvardingan',
    kind: 'ancient',
    m: 1,
    d1: 19,
    t: {
      fa: { title: 'فروردینگان', desc: 'روز یادبود درگذشتگان و فروهرها؛ خاندان‌ها به آرامگاه‌ها می‌روند و یاد نیاکان را گرامی می‌دارند.' },
      en: { title: 'Farvardingan', desc: 'A day to remember the departed and ancestral spirits; families visit graves and honour their forebears.' },
      ru: { title: 'Фарвардинган', desc: 'День памяти ушедших и духов предков; семьи посещают могилы и чтят память предков.' },
    },
  },
  {
    id: 'ordibeheshtgan',
    kind: 'ancient',
    m: 2,
    d1: 3,
    t: {
      fa: { title: 'اردیبهشتگان', desc: 'جشن گل و روشنایی؛ ستایش اردیبهشت، فرشتهٔ راستی و نور، در اوج بهار.' },
      en: { title: 'Ordibeheshtgan', desc: 'A festival of flowers and light, honouring Ordibehesht, the spirit of truth, at the height of spring.' },
      ru: { title: 'Ордибехештган', desc: 'Праздник цветов и света в честь Ордибехешта, духа истины, в разгар весны.' },
    },
  },
  {
    id: 'khordadgan',
    kind: 'ancient',
    m: 3,
    d1: 6,
    t: {
      fa: { title: 'خردادگان', desc: 'جشن آب و رسایی؛ روزی برای قدردانی از آب و بارور شدن زمین.' },
      en: { title: 'Khordadgan', desc: 'A festival of water and perfection, giving thanks for water and the fertile earth.' },
      ru: { title: 'Хордадган', desc: 'Праздник воды и совершенства: благодарность воде и плодородной земле.' },
    },
  },
  {
    id: 'tirgan',
    kind: 'ancient',
    m: 4,
    d1: 13,
    t: {
      fa: { title: 'تیرگان', desc: 'جشن باران و آب‌پاشی در گرمای تابستان؛ به یاد تیر آرش. نزدیک‌ترین جشن باستانی به حال‌وهوای دریا.' },
      en: { title: 'Tirgan', desc: 'A summer festival of rain and splashing water, remembering Arash’s arrow: the ancient feast closest to the spirit of the sea.' },
      ru: { title: 'Тирган', desc: 'Летний праздник дождя и брызг воды в память о стреле Араша; древний праздник, ближе всего к духу моря.' },
    },
  },
  {
    id: 'mordadgan',
    kind: 'ancient',
    m: 5,
    d1: 7,
    t: {
      fa: { title: 'مردادگان (امردادگان)', desc: 'جشن گیاهان و بی‌مرگی؛ ستایش درخت و رویش و آبادانی.' },
      en: { title: 'Amordadgan', desc: 'A festival of plants and immortality, honouring trees, growth and a flourishing land.' },
      ru: { title: 'Амордадган', desc: 'Праздник растений и бессмертия: почитание деревьев, роста и процветания земли.' },
    },
  },
  {
    id: 'shahrivargan',
    kind: 'ancient',
    m: 6,
    d1: 4,
    t: {
      fa: { title: 'شهریورگان', desc: 'جشن شهریور، نمادِ شهریاری آرمانی و مهربانی؛ در برخی روایت‌ها به زادروز کوروش هم نسبت داده می‌شود.' },
      en: { title: 'Shahrivargan', desc: 'A festival of Shahrivar, symbol of just rule and kindness; some accounts link it to Cyrus’s birthday.' },
      ru: { title: 'Шахриварган', desc: 'Праздник Шахривара, символа справедливой власти и доброты; по некоторым рассказам связан с днём рождения Кира.' },
    },
  },
  {
    id: 'lakizab',
    kind: 'wind',
    src: ['local', 'kanin'],
    m: 7,
    d1: 23,
    d2: 28,
    t: {
      fa: {
        title: 'باد لکیذب (لچیذب)',
        desc: 'بادی ناگهانی و کوتاه که شبیه لیمهر است اما خفیف‌تر؛ به همین خاطر «باد گول‌زن» نامیده می‌شود و گاهی با لیمهر اشتباه گرفته می‌شود.',
      },
      en: {
        title: 'Lakizab wind (Lachizab)',
        desc: 'A sudden, short-lived gust that looks like Limehr but is milder, hence its name “the fooling wind”; locals sometimes mistake it for Limehr.',
      },
      ru: {
        title: 'Ветер лякизаб (лачизаб)',
        desc: 'Внезапный и недолгий порыв, похожий на лимехр, но слабее, за что его зовут «обманным ветром»; местные порой путают его с лимехром.',
      },
    },
  },
  {
    id: 'mehregan',
    kind: 'ancient',
    m: 7,
    d1: 16,
    t: {
      fa: { title: 'مهرگان', desc: 'جشن پاییزی دوستی و مهر و برداشت محصول؛ دومین جشن بزرگ ایرانیان پس از نوروز.' },
      en: { title: 'Mehregan', desc: 'The autumn festival of friendship, affection and harvest, Iran’s great feast after Nowruz.' },
      ru: { title: 'Мехреган', desc: 'Осенний праздник дружбы, любви и урожая: величайший иранский праздник после Новруза.' },
    },
  },
  {
    id: 'abangan',
    kind: 'ancient',
    m: 8,
    d1: 10,
    t: {
      fa: { title: 'آبان‌گان', desc: 'جشن آب و ستایش ناهید، بانوی آب‌ها؛ برای شهری کنار دریا، روزی ویژه است.' },
      en: { title: 'Abangan', desc: 'A festival of water, honouring Anahita, lady of the waters: a special day for a town on the sea.' },
      ru: { title: 'Абанган', desc: 'Праздник воды в честь Анахиты, владычицы вод: особый день для приморского города.' },
    },
  },
  {
    id: 'limehr',
    kind: 'wind',
    src: ['local', 'limar', 'kanin'],
    m: 8,
    d1: 23,
    d2: 28,
    t: {
      fa: {
        title: 'باد لیمهر (لیمر، لحیمر)',
        desc: 'از شناخته‌ترین بادهای ساحل بوشهر و نشانهٔ پایان گرما و آغاز سرمای سال. در روایت دریانوردان «باد سرخ» است که از سمت عربستان می‌آید. وزش اصلی حدود یک هفته می‌ماند، موج را بلند و آب را گل‌آلود می‌کند و پس از فروکش، معمولاً صید خوب می‌شود.',
      },
      en: {
        title: 'Limehr wind (Limar, Lahimar)',
        desc: 'One of the best-known winds of the Bushehr coast, marking the end of the heat and the start of the cold season. Sailors call it the “red wind” from Arabia. The main blow lasts about a week, raising waves and clouding the water; once it passes, fishing is usually good.',
      },
      ru: {
        title: 'Ветер лимехр (лимар, лахимар)',
        desc: 'Один из самых известных ветров побережья Бушера: он знаменует конец жары и начало холодов. Моряки зовут его «красным ветром» из Аравии. Основной порыв длится около недели, поднимает волны и мутит воду; после него лов обычно хороший.',
      },
    },
  },
  {
    id: 'azargan',
    kind: 'ancient',
    m: 9,
    d1: 9,
    t: {
      fa: { title: 'آذرگان', desc: 'جشن آتش و گرما در آستانهٔ سرما؛ در این روز دور آتش جمع می‌شدند.' },
      en: { title: 'Azargan', desc: 'A festival of fire and warmth as the cold sets in; people gathered around the flames.' },
      ru: { title: 'Азарган', desc: 'Праздник огня и тепла с приходом холодов; люди собирались у костра.' },
    },
  },
  {
    id: 'yalda',
    kind: 'ancient',
    m: 9,
    d1: 30,
    t: {
      fa: { title: 'شب یلدا', desc: 'بلندترین شب سال و میلاد مهر؛ شبی با انار و هندوانه و حافظ‌خوانی تا بازگشت خورشید.' },
      en: { title: 'Yalda night', desc: 'The longest night of the year and the birth of light: pomegranates, watermelon and Hafez until the sun returns.' },
      ru: { title: 'Ночь Ялда', desc: 'Самая длинная ночь года и рождение света: гранаты, арбуз и стихи Хафиза до возвращения солнца.' },
    },
  },
  {
    id: 'deygan',
    kind: 'ancient',
    m: 10,
    d1: 1,
    t: {
      fa: { title: 'دی‌گان (خرم‌روز)', desc: 'نخستین روز دی و جشن آفریدگار؛ روزی برای بخشش و آشتی در دل زمستان.' },
      en: { title: 'Deygan (Khorram Ruz)', desc: 'The first day of Dey and a feast of the Creator: a day of forgiveness and reconciliation in midwinter.' },
      ru: { title: 'Дейган (Хоррам-руз)', desc: 'Первый день месяца Дей и праздник Творца: день прощения и примирения посреди зимы.' },
    },
  },
  {
    id: 'bahmangan',
    kind: 'ancient',
    m: 11,
    d1: 2,
    t: {
      fa: { title: 'بهمنگان', desc: 'جشن اندیشهٔ نیک و مهربانی با چهارپایان؛ در گذشته خوراکی بدون گوشت می‌پختند.' },
      en: { title: 'Bahmangan', desc: 'A feast of good thought and kindness to animals; traditionally a meat-free meal was prepared.' },
      ru: { title: 'Бахманган', desc: 'Праздник благой мысли и доброты к животным; по традиции готовили блюда без мяса.' },
    },
  },
  {
    id: 'sadeh',
    kind: 'ancient',
    m: 11,
    d1: 10,
    t: {
      fa: { title: 'سده', desc: 'جشن آتش، پنجاه روز پیش از نوروز؛ شکست سرمای زمستان با افروختن آتش بزرگ.' },
      en: { title: 'Sadeh', desc: 'The fire festival fifty days before Nowruz, defying midwinter cold with a great bonfire.' },
      ru: { title: 'Сада', desc: 'Праздник огня за пятьдесят дней до Новруза: большой костёр побеждает зимний холод.' },
    },
  },
  {
    id: 'badireh',
    kind: 'ancient',
    m: 11,
    d1: 22,
    t: {
      fa: { title: 'بادیره (روز باد)', desc: 'روز ستایش باد در تقویم کهن؛ پیوندی زیبا با بادهای دریایی هلیله.' },
      en: { title: 'Badireh (wind day)', desc: 'A day honouring the wind in the old calendar, a fitting link to the sea winds of Helileh.' },
      ru: { title: 'Бадире (день ветра)', desc: 'День почитания ветра в древнем календаре: прекрасная связь с морскими ветрами Хелилы.' },
    },
  },
  {
    id: 'sepandarmazgan',
    kind: 'ancient',
    m: 12,
    d1: 5,
    t: {
      fa: { title: 'سپندارمذگان (اسفندگان)', desc: 'جشن زمین و مهر مادران؛ روز گرامی‌داشت زنان و پیشکش هدیه به مادران.' },
      en: { title: 'Sepandarmazgan', desc: 'A feast of the earth and of mothers, honouring women with gifts for mothers.' },
      ru: { title: 'Сепандармазган', desc: 'Праздник земли и матерей: день почитания женщин и подарков матерям.' },
    },
  },
  {
    id: 'chaharshanbe',
    kind: 'ancient',
    m: 12,
    d1: 24,
    label: {
      fa: 'آخرین سه‌شنبه سال',
      en: 'Last Tuesday of the year',
      ru: 'Последний вторник года',
    },
    t: {
      fa: { title: 'چهارشنبه‌سوری', desc: 'شب پریدن از روی آتش و آغاز استقبال از نوروز؛ زردی من از تو، سرخی تو از من.' },
      en: { title: 'Chaharshanbe Suri', desc: 'The night of leaping over bonfires that welcomes Nowruz: “my yellow to you, your red to me.”' },
      ru: { title: 'Чахаршанбе-сури', desc: 'Ночь прыжков через костры, встречающая Новруз: «моя желтизна тебе, твой румянец мне».' },
    },
  },

  {
    id: 'pirzan',
    kind: 'wind',
    m: 1,
    d1: 10,
    d2: 13,
    src: ['kanin'],
    t: {
      fa: { title: 'باد پیرزن (بردالعجوز)', desc: 'نخستین باد آغاز فصل گرم؛ شدتش زیاد نیست و برای صید ماهی مفید است.' },
      en: { title: 'Pirzan wind (Bard al-Ajuz)', desc: 'The first wind of the warm season: not very strong, and useful for fishing.' },
      ru: { title: 'Ветер пирзан (бард аль-аджуз)', desc: 'Первый ветер тёплого сезона: не очень сильный и полезный для рыбной ловли.' },
    },
  },
  {
    id: 'tarazu',
    kind: 'wind',
    m: 3,
    d1: 3,
    label: { fa: 'حدود ۳', en: '≈ 3', ru: '≈ 3' },
    src: ['kanin'],
    t: {
      fa: { title: 'شمال ترازو', desc: 'حدود ۶۵ روز پس از نوروز می‌وزد؛ نسبتاً ملایم است و در صید ماهی نقش مهمی دارد.' },
      en: { title: 'Shomal Tarazu', desc: 'Blows about 65 days after Nowruz; fairly mild and important for fish catches.' },
      ru: { title: 'Шомаль таразу', desc: 'Дует примерно через 65 дней после Новруза; довольно мягкий и важный для улова.' },
    },
  },
  {
    id: 'summer-shamal',
    kind: 'wind',
    m: 3,
    d1: 11,
    end: [4, 24],
    label: { fa: 'خرداد تا نیمهٔ تیر', en: 'Khordad to mid-Tir', ru: 'Хордад – середина Тира' },
    src: ['pilot', 'jphgr'],
    t: {
      fa: {
        title: 'شمال تابستانی (بارح)',
        desc: 'باد خشک شمال‌غربی که تقریباً پیوسته در خرداد و بخشی از تیر می‌وزد و گاهی گردوخاک بیابان‌های بین‌النهرین را می‌آورد. بیشتر آرام تا متوسط است؛ پژوهش‌ها نشان داده‌اند در بوشهر الگوی نسیم دریا را به هم می‌زند.',
      },
      en: {
        title: 'Summer shamal (Barih)',
        desc: 'A dry north-westerly that blows almost continuously in Khordad and part of Tir, sometimes carrying dust from the Mesopotamian deserts. Mostly light to moderate; studies show it disrupts the sea-breeze pattern at Bushehr.',
      },
      ru: {
        title: 'Летний шамаль (барих)',
        desc: 'Сухой северо-западный ветер, который почти непрерывно дует в хордаде и часть тира, порой неся пыль из месопотамских пустынь. В основном слабый или умеренный; исследования показывают, что у Бушера он нарушает морской бриз.',
      },
    },
  },
  {
    id: 'kaus',
    kind: 'wind',
    m: 9,
    d1: 10,
    end: [1, 31],
    label: { fa: 'آذر تا فروردین', en: 'Azar to Farvardin', ru: 'Азар – Фарвардин' },
    src: ['pilot', 'kanin'],
    t: {
      fa: {
        title: 'باد کوس (قوس، جنوب‌شرقی)',
        desc: 'باد زمستانیِ جنوب‌شرقی که بین آذر و فروردین به‌نوبت با شمال می‌وزد. کمتر از سه روز می‌ماند، هوا را گرفته و بارانی می‌کند و گاهی رعدوبرق دارد.',
      },
      en: {
        title: 'Kaus wind (south-easterly)',
        desc: 'A south-easterly winter wind that alternates with the shamal between Azar and Farvardin. It seldom lasts more than three days, bringing heavy, rainy weather and sometimes thunder.',
      },
      ru: {
        title: 'Ветер каус (юго-восточный)',
        desc: 'Юго-восточный зимний ветер, который между азаром и фарвардином чередуется с шамалем. Редко длится больше трёх дней, приносит пасмурную дождливую погоду, иногда с грозой.',
      },
    },
  },
  {
    id: 'winter-shamal',
    kind: 'wind',
    m: 9,
    d1: 10,
    end: [12, 29],
    label: { fa: 'آذر تا اسفند', en: 'Azar to Esfand', ru: 'Азар – Эсфанд' },
    src: ['wiki', 'pilot', 'jphgr'],
    t: {
      fa: {
        title: 'شمال زمستانی',
        desc: 'پس از عبور هوای سرد از شمال می‌وزد؛ معمولاً از یک تا پنج روز می‌ماند و در زمستان هر چند روز بازمی‌گردد. دریا را مواج می‌کند و گاهی با رگبار و رعدوبرق همراه است.',
      },
      en: {
        title: 'Winter shamal',
        desc: 'Follows the passage of a cold front from the north; usually lasts one to five days and returns every few days in winter. It raises the sea and sometimes brings squalls and thunder.',
      },
      ru: {
        title: 'Зимний шамаль',
        desc: 'Приходит после прохождения холодного фронта с севера; обычно длится от одного до пяти дней и зимой возвращается каждые несколько дней. Поднимает волну, порой с шквалами и грозой.',
      },
    },
  },
  {
    id: 'suhaili',
    kind: 'wind',
    m: 10,
    d1: 1,
    end: [12, 29],
    label: { fa: 'زمستان (کمیاب)', en: 'Winter (rare)', ru: 'Зима (редко)' },
    src: ['pilot'],
    t: {
      fa: {
        title: 'باد سهیلی (جنوب‌غربی)',
        desc: 'باد کمیاب زمستانی که چند ساعت می‌وزد و اغلب پس از کوس می‌آید. با باران همراه است و پیش از آن ابرهای جنوبی و برق دیده می‌شود؛ لنگرگاه‌های ساحلی را ناآرام می‌کند.',
      },
      en: {
        title: 'Suhaili wind (south-westerly)',
        desc: 'A rare winter wind lasting a few hours, often following a kaus. It brings rain, preceded by cloud banks and lightning in the south, and it disturbs coastal anchorages.',
      },
      ru: {
        title: 'Ветер сухейли (юго-западный)',
        desc: 'Редкий зимний ветер на несколько часов, часто после кауса. Приносит дождь, перед ним на юге видны облачные гряды и молнии; тревожит прибрежные якорные стоянки.',
      },
    },
  },
  {
    id: 'tobiyeh',
    kind: 'wind',
    m: 11,
    d1: 20,
    end: [11, 30],
    label: { fa: 'اواخر بهمن', en: 'Late Bahman', ru: 'Конец Бахмана' },
    src: ['kanin'],
    t: {
      fa: { title: 'باد توبیه', desc: 'آخرین باد بزرگ شمالی سال؛ سرد و همراه رعدوبرق. ناخداها در این روزها کمتر به دریا می‌زنند.' },
      en: { title: 'Tobiyeh wind', desc: 'The last big north wind of the year: cold, with thunder and lightning. Sailors tend to stay off the sea in these days.' },
      ru: { title: 'Ветер тобие', desc: 'Последний большой северный ветер года: холодный, с громом и молниями. В эти дни моряки реже выходят в море.' },
    },
  },
];
