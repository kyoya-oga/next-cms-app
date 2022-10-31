import { FC, ReactNode } from 'react';
import AppHead from '../common/AppHead';
import UserNav from '../common/nav/UserNav';

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ title, desc, children }): JSX.Element => {
  return (
    <>
      <AppHead title={title} description={desc} />
      <header className="min-h-screen bg-primary dark:bg-primary-dark transition-colors">
        <UserNav />

        <main className="max-w-4xl mx-auto">{children}</main>
      </header>
    </>
  );
};

export default DefaultLayout;
