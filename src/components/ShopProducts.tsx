import ProductArt from '@/components/ProductArt';
import { productUi, products } from '@/content/products';
import type { Lang } from '@/content/types';

export default function ShopProducts({ lang, phone }: { lang: Lang; phone: string }) {
  const u = productUi[lang];
  return (
    <div className="pr-wrap">
      <h2 className="accent">{u.title}</h2>
      <ul className="pr-grid">
        {products.map((p) => (
          <li key={p.id} className="pr-card" data-sound="shop">
            <span className="pr-pic">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/products/${p.photo}`} alt={p.name[lang]} loading="lazy" />
              ) : (
                <ProductArt name={p.art} />
              )}
            </span>
            <h3>{p.name[lang]}</h3>
            <a className="btn btn-blue" href={`tel:${phone}`} data-sound="pop">
              {u.ask}
            </a>
          </li>
        ))}
      </ul>
      <p className="pr-note">{u.note}</p>
    </div>
  );
}
