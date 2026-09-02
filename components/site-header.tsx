'use client';

import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation } from '@/lib/site-data';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-shell flex h-[76px] items-center justify-between gap-6">
        <a
          href="/"
          className="brand-lockup"
          aria-label="Alpha Envirotech home"
        >
          <picture>
            <source
              srcSet="/images/aec-mark-transparent.webp"
              type="image/webp"
            />
            <img
              src="/images/aec-mark-transparent.png"
              alt=""
              width="70"
              height="53"
            />
          </picture>
          <span>
            <strong>Alpha Envirotech</strong>
            <small>Consulting, Inc.</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <a
            className="button button-small header-cta"
            href="/contact/#project-inquiry"
          >
            Start a project
          </a>
          <button
            type="button"
            className="menu-button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav className="site-shell" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="button mt-3"
            href="/contact/#project-inquiry"
            onClick={() => setOpen(false)}
          >
            Start a project inquiry
          </a>
        </nav>
      </div>
    </header>
  );
}
