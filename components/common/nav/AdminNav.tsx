import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

import Logo from '../Logo';

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY = 'nav-visibility';

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;

    if (visibility) {
      // hide nav
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // show nav
      classList.remove(NAV_CLOSE_WIDTH);
      classList.add(NAV_OPEN_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);

    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        <Link href="/admin">
          <a className="flex items-center space-x-2 p-3 mb-10">
            <Logo className="dark:fill-highlight-dark fill-highlight-light w-5 h-5" />
            {visible ? (
              <span className="text-xl leading-none font-semibold dark:text-highlight-dark text-highlight-light">
                Admin
              </span>
            ) : null}
          </a>
        </Link>

        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <Link key={item.href} href={item.href}>
                <a className="flex items-center text-xl dark:text-highlight-dark text-highlight-light p-3 hover:scale-[0.98] transition-transform">
                  <item.icon size={24} />
                  {visible ? (
                    <span className="ml-2 leading-none">{item.label}</span>
                  ) : null}
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={updateNavState}
        className="dark:text-highlight-dark text-highlight-light p-3 hover:scale-95 transition-transform self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
