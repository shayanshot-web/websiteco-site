import Link from '@/components/A';
import type { InnerPageId, Lang, Post } from '@/content/types';
import ContactForm from './ContactForm';
import { Rich, Sections } from './Rich';
import { dicts, formatDate, pagePath, postPath, type Route } from '@/lib/i18n';

function PageHero({ title, lead, meta }: { title: string; lead?: string; meta?: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        {meta ? <p className="meta">{meta}</p> : null}
        {lead ? (
          <p className="lead">
            <Rich text={lead} />
          </p>
        ) : null}
      </div>
    </section>
  );
}

function BlogList({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  return (
    <section>
      <h2>{d.ui.latestPosts}</h2>
      <div className="cards">
        {d.posts.map((p: Post) => (
          <article key={p.id} className="card">
            <p className="meta">{formatDate(lang, p.date)}</p>
            <h3>
              <Link href={postPath(lang, p)}>{p.title}</Link>
            </h3>
            <p>{p.excerpt}</p>
            <Link className="more" href={postPath(lang, p)}>
              {d.ui.readMore}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeView({ lang }: { lang: Lang }) {
  const d = dicts[lang];
  const h = d.home;
  const tileLinks: InnerPageId[] = ['about', 'stay', 'experiences', 'experiences'];
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>{h.h1}</h1>
          <p className="hero-lead">{h.lead}</p>
          <div className="btn-row">
            <Link className="btn btn-sand" href={pagePath(lang, 'stay')}>
              {h.ctaStay}
            </Link>
            <Link className="btn btn-outline" href={pagePath(lang, 'events')}>
              {h.ctaEvents}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="accent">{h.introTitle}</h2>
          <p>{h.introText}</p>
          <Link className="btn btn-blue" href={pagePath(lang, 'about')}>
            {h.introCta}
          </Link>
        </div>
      </section>

      <section className="container">
        <ul className="tiles">
          {h.tiles.map((t, i) => (
            <li key={t.h}>
              <Link href={pagePath(lang, tileLinks[i])} className="tile">
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="band">
        <div className="container narrow">
          <h2>{h.stayTitle}</h2>
          <p>{h.stayText}</p>
          <Link className="btn btn-blue" href={pagePath(lang, 'contact')}>
            {h.stayCta}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="accent">{h.doTitle}</h2>
          <div className="cards four">
            {h.doItems.map((t) => (
              <div key={t.h} className="card">
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container narrow">
          <h2>{h.eventsTitle}</h2>
          <p>
            <Rich text={h.eventsText} />
          </p>
          <Link className="btn btn-blue" href={pagePath(lang, 'events')}>
            {h.eventsCta}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2 className="accent">{h.shopTitle}</h2>
          <p>{h.shopText}</p>
          <Link className="btn btn-navy" href={pagePath(lang, 'shop')}>
            {h.shopCta}
          </Link>
        </div>
      </section>

      <section className="contact-band">
        <div className="container narrow">
          <h2>{h.contactTitle}</h2>
          <p>
            {d.ui.phoneLabel}:{' '}
            <a href={`tel:${d.phone}`} dir="ltr">
              {d.phoneDisplay}
            </a>
            <br />
            {d.ui.addressLabel}: {d.address}
          </p>
        </div>
      </section>
    </>
  );
}

export function PageView({ lang, id }: { lang: Lang; id: InnerPageId }) {
  const d = dicts[lang];
  const p = d.pages[id];
  return (
    <>
      <PageHero title={p.title} lead={p.lead} />
      <div className="container prose">
        {id === 'blog' ? (
          <BlogList lang={lang} />
        ) : (
          <>
            <Sections sections={p.sections} />
            {id === 'events' ? <p className="notice">{d.ui.noEvents}</p> : null}
            {id === 'stay' || id === 'shop' ? (
              <p>
                <Link className="btn btn-blue" href={pagePath(lang, 'contact')}>
                  {id === 'stay' ? d.home.stayCta : d.ui.shopCta}
                </Link>
              </p>
            ) : null}
            {id === 'contact' ? (
              <>
                <p>
                  <a className="btn btn-navy" href={`tel:${d.phone}`} dir="ltr">
                    {d.phoneDisplay}
                  </a>
                </p>
                <ContactForm ui={d.ui.form} lang={lang} />
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export function PostView({ lang, post }: { lang: Lang; post: Post }) {
  const d = dicts[lang];
  return (
    <>
      <PageHero title={post.title} meta={`${d.ui.publishedOn} ${formatDate(lang, post.date)}`} />
      <article className="container prose">
        <p className="lead">{post.lead}</p>
        <Sections sections={post.sections} />
        <p>
          <Link className="more" href={pagePath(lang, 'blog')}>
            {d.ui.backToBlog}
          </Link>
        </p>
      </article>
    </>
  );
}

export function View({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <HomeView lang={route.lang} />;
    case 'page':
      return <PageView lang={route.lang} id={route.id} />;
    case 'post':
      return <PostView lang={route.lang} post={route.post} />;
  }
}
