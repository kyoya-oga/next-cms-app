import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';

import Logo from './Logo';

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  return (
    <nav className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark">
      <Link href="/admin">
        <a className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="dark:fill-highlight-dark fill-highlight-light w-5 h-5" />
          <span className="text-xl font-semibold dark:text-highlight-dark text-highlight-light">
            Admin
          </span>
        </a>
      </Link>

      <div className="space-y-6">
        {navItems.map((item) => {
          return (
            <Link key={item.href} href={item.href}>
              <a className="flex items-center text-xl dark:text-highlight-dark text-highlight- p-3 hover:scale-[0.98] transition-transform">
                <item.icon size={24} />
                <span className="ml-2">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminNav;
