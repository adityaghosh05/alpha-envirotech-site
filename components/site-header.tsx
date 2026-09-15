'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation } from '@/lib/site-data';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerNavigation = navigation.filter(
    (item) => item.href !== '/contact/',
  );

  return (
    <header className="site-header">
      <div className="site-shell flex h-[76px] items-center justify-between gap-6">
        <Link
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
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {headerNavigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href);
            if (item.children) {
              const expanded = activeDropdown === item.href;
              return (
                <div
                  className="nav-item"
                  key={item.href}
                  onMouseEnter={() => setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    className="nav-trigger"
                    aria-expanded={expanded}
                    aria-current={active ? 'page' : undefined}
                    onClick={() =>
                      setActiveDropdown(expanded ? null : item.href)
                    }
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <div className={`nav-dropdown ${expanded ? 'is-open' : ''}`}>
                    <Link className="nav-overview" href={item.href}>
                      View all {item.label.toLowerCase()}
                    </Link>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link
            className="button button-small header-cta"
            href="/contact/#get-in-touch"
          >
            Get in Touch
          </Link>
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
          {headerNavigation.map((item) =>
            item.children ? (
              <details className="mobile-nav-group" key={item.href}>
                <summary>
                  {item.label}
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    View all {item.label.toLowerCase()}
                  </Link>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            className="button mt-3"
            href="/contact/#get-in-touch"
            onClick={() => setOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
