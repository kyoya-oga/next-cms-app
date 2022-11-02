import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import useDarkMode from '../../../hooks/useDarkMode';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push('/admin/posts/create');
  const handleLogout = async () => await signOut();

  const options: DropDownOptions = [
    {
      label: 'Add New Post',
      onClick: navigateToCreateNewPost,
    },
    {
      label: 'Change Theme',
      onClick: toggleTheme,
    },
    {
      label: 'Log Out',
      onClick: handleLogout,
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <SearchBar />

      <DropdownOptions
        head={<ProfileHead nameInitial="J" />}
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
