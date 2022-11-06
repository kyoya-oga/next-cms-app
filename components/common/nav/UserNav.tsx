import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';
import useDarkMode from '../../../hooks/useDarkMode';
import { UserProfile } from '../../../utils/types';
import { GithubAuthButton } from '../../button';
import { APP_NAME } from '../AppHead';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import Logo from '../Logo';
import ProfileHead from '../ProfileHead';

interface Props {}

const defaultOptions: DropDownOptions = [
  {
    label: 'Logout',
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (props): JSX.Element => {
  const { data, status } = useSession();

  const { toggleTheme } = useDarkMode();

  const isAuth = status === 'authenticated';
  const router = useRouter();
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile && profile.role === 'admin';

  const dropdownOptions: DropDownOptions = isAdmin
    ? [
        {
          label: 'Dashboard',
          onClick() {
            router.push('/admin');
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className="flex items-center justify-between bg-primary-dark p-3 ">
      <Link href="/">
        <a className="flex space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark" />
          <span className="text-xl">{APP_NAME}</span>
        </a>
      </Link>

      <div className="flex items-center space-x-5">
        <button
          onClick={toggleTheme}
          className="dark:text-secondary-dark text-secondary-light"
        >
          <HiLightBulb size={34} />
        </button>

        {isAuth ? (
          <DropdownOptions
            options={dropdownOptions}
            head={<ProfileHead nameInitial="B" lightOnly />}
          />
        ) : (
          <GithubAuthButton lightOnly />
        )}
      </div>
    </div>
  );
};

export default UserNav;
