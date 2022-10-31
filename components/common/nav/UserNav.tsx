import Link from 'next/link';
import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';
import { GithubAuthButton } from '../../button';
import { APP_NAME } from '../AppHead';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import Logo from '../Logo';
import ProfileHead from '../ProfileHead';

interface Props {}

const UserNav: FC<Props> = (props): JSX.Element => {
  const dropdownOptions: DropDownOptions = [
    {
      label: 'Dashboard',
      onClick: () => {},
    },
    {
      label: 'Logout',
      onClick: () => {},
    },
  ];
  return (
    <div className="flex items-center justify-between bg-primary-dark p-3 ">
      <Link href="/">
        <a className="flex space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark" />
          <span className="text-xl">{APP_NAME}</span>
        </a>
      </Link>

      <div className="flex items-center space-x-5">
        <button className="dark:text-secondary-dark text-secondary-light">
          <HiLightBulb size={34} />
        </button>
        <GithubAuthButton onClick={() => {}} lightOnly />

        {/* <DropdownOptions
          options={dropdownOptions}
          head={<ProfileHead nameInitial="B" lightOnly />}
        /> */}
      </div>
    </div>
  );
};

export default UserNav;
