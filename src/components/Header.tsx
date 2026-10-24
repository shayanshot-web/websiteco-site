'use client';

import Link from '@/components/A';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
}
export interface LangItem {
  code: string;
  name: string;
  href: string;
  active: boolean;
}

interface Props {
  siteName: string;
  homeHref: string;
  items: NavItem[];
  langs: LangItem[];
  menuLabel: string;
  langLabel: string;
  searchAction: string;
  searchLabel: string;
  searchPlaceholder: string;
}

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#0A3E66" />
      <circle cx="20" cy="15" r="5" fill="#D9C7A6" />
      <path d="M6 24c3.4-2.6 6.8-2.6 10.2 0s6.8 2.6 10.2 0 5.4-2 7.6-.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 30c3.4-2.6 6.8-2.6 10.2 0s6.8 2.6 10.2 0 5.4-2 7.6-.6" fill="none" stroke="#0A6FB5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header(p: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '';
  const active = (href: string) => (href === p.homeHref ? pathname === href : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href={p.homeHref} className="brand" onClick={() => setOpen(false)}>
          <Logo />
          <span>{p.siteName}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{p.menuLabel}</span>
          <span className="bars" aria-hidden="true" />
        </button>

        <nav id="site-nav" className={open ? 'site-nav open' : 'site-nav'} aria-label={p.menuLabel}>
          <ul>
            {p.items.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  aria-current={active(i.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* فرم ساده GET (بدون نیاز به جاوااسکریپت)، تا در صفحه‌های پویای PHP هم کار کند */}
          <form className="header-search" action={p.searchAction} method="get" role="search">
            <label className="sr-only" htmlFor="header-q">
              {p.searchLabel}
            </label>
            <input
              id="header-q"
              type="search"
              name="q"
              placeholder={p.searchPlaceholder}
              maxLength={100}
              autoComplete="off"
            />
            <button type="submit" aria-label={p.searchLabel}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>
          <div className="lang-switch" role="group" aria-label={p.langLabel}>
            {p.langs.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                hrefLang={l.code}
                lang={l.code}
                aria-current={l.active ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
