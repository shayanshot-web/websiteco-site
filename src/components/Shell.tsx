import Link from '@/components/A';
import type { ReactNode } from 'react';
import type { PageId } from '@/content/types';
import Header from './Header';
import { WaveEdge } from './Art';
import LangSync from './LangSync';
import SoundFX from './SoundFX';
import HelilehMap from './HelilehMap';
import {
  altRoute,
  dicts,
  formatYear,
  langs,
  pagePath,
  routePath,
  searchPath,
  type Route,
} from '@/lib/i18n';

const navOrder: PageId[] = ['home', 'about', 'stay', 'experiences', 'gallery', 'blog', 'events', 'shop', 'contact'];

export default function Shell({ route, children }: { route: Route; children: ReactNode }) {
  const lang = route.lang;
  const d = dicts[lang];
  const items = navOrder.map((id) => ({ label: d.nav[id], href: pagePath(lang, id) }));
  const switcher = langs.map((l) => ({
    code: l,
    name: dicts[l].langName,
    href: routePath(altRoute(route, l)),
    active: l === lang,
  }));

  return (
    <div lang={lang} dir={d.dir} className={`shell lang-${lang}`}>
      <LangSync lang={lang} dir={d.dir} />
      <a className="skip-link" href="#main">
        {d.ui.skip}
      </a>
      <Header
        siteName={d.siteName}
        homeHref={pagePath(lang, 'home')}
        items={items}
        langs={switcher}
        menuLabel={d.ui.menu}
        langLabel={d.ui.language}
        searchAction={searchPath(lang)}
        searchLabel={d.ui.search.label}
        searchPlaceholder={d.ui.search.placeholder}
      />
      <main id="main">{children}</main>
      <HelilehMap lang={lang} locale={d.locale} dir={d.dir} />
      <SoundFX onLabel={d.ui.sound.on} offLabel={d.ui.sound.off} hint={d.ui.sound.hint} />
      <footer className="site-footer">
        <WaveEdge position="top" />
        <div className="container footer-grid">
          <div>
            <p className="footer-title">{d.siteName}</p>
            <p>{d.tagline}</p>
          </div>
          <nav aria-label={d.ui.menu}>
            <ul className="footer-links">
              {items.slice(1).map((i) => (
                <li key={i.href}>
                  <Link href={i.href} data-sound="tick">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p>
              {d.ui.managerLabel}: {d.manager}
            </p>
            <p>
              {d.ui.phoneLabel}:{' '}
              <a href={`tel:${d.phone}`} dir="ltr">
                {d.phoneDisplay}
              </a>
            </p>
            <p>
              {d.ui.addressLabel}: {d.address}
            </p>
          </div>
        </div>
        <p className="copyright">
          © {formatYear(lang)} {d.org}. {d.ui.rights}
        </p>
      </footer>
    </div>
  );
}
