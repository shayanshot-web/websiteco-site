import type { Lang } from './types';

/**
 * گالری تصاویر.
 * برای افزودن عکس: فایل را در public/gallery/ بگذارید و یک ردیف به galleryItems اضافه کنید.
 */
export type GalleryCat = 'sea' | 'village' | 'people' | 'food' | 'craft' | 'culture';

export interface GalleryItem {
  /** نام فایل داخل public/gallery */
  file: string;
  cat: GalleryCat;
  title: Record<Lang, string>;
  /** متن جایگزین؛ اگر نباشد عنوان استفاده می‌شود */
  alt?: Record<Lang, string>;
  place?: Record<Lang, string>;
  /** نام عکاس */
  credit?: string;
  /** نسبت تصویر، مثلاً 3/2 یا 4/5؛ پیش‌فرض 4/3 */
  ratio?: string;
}

export const galleryItems: GalleryItem[] = [];

export const galleryUi: Record<
  Lang,
  { all: string; cats: Record<GalleryCat, string>; slot: string; soon: string; photoBy: string; close: string; prev: string; next: string; open: string }
> = {
  fa: {
    all: 'همه',
    cats: { sea: 'دریا و ساحل', village: 'روستا', people: 'مردم', food: 'خوراک', craft: 'صنایع دستی', culture: 'فرهنگ و آیین' },
    slot: 'جای عکس',
    soon: 'عکس‌های هلیله به‌زودی در این قاب‌ها قرار می‌گیرند.',
    photoBy: 'عکس',
    close: 'بستن',
    prev: 'قبلی',
    next: 'بعدی',
    open: 'بزرگ‌نمایی',
  },
  en: {
    all: 'All',
    cats: { sea: 'Sea and beach', village: 'Village', people: 'People', food: 'Food', craft: 'Handicrafts', culture: 'Culture and rituals' },
    slot: 'Photo slot',
    soon: 'Photos of Helileh will appear in these frames soon.',
    photoBy: 'Photo',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    open: 'Enlarge',
  },
  ru: {
    all: 'Все',
    cats: { sea: 'Море и пляж', village: 'Деревня', people: 'Люди', food: 'Еда', craft: 'Ремёсла', culture: 'Культура и обряды' },
    slot: 'Место для фото',
    soon: 'Фотографии Хелиле скоро появятся в этих рамках.',
    photoBy: 'Фото',
    close: 'Закрыть',
    prev: 'Назад',
    next: 'Вперёд',
    open: 'Увеличить',
  },
};
