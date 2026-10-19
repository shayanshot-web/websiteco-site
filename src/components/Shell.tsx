import Link from '@/components/A';
import type { ReactNode } from 'react';
import type { PageId } from '@/content/types';
import Header from './Header';
import LangSync from './LangSync';
import {
  altRoute,
  dicts,
  formatYear,
  langs,
  pagePath,
  routePath,
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
      />
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="footer-title">{d.siteName}</p>
            <p>{d.tagline}</p>
          </div>
          <nav aria-label={d.ui.menu}>
            <ul className="footer-links">
              {items.slice(1).map((i) => (
                <li key={i.href}>
                  <Link href={i.href}>{i.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
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
