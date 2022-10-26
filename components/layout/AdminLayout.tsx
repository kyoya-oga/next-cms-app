import Link from 'next/link';
import { FC, ReactNode } from 'react';
import {
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineMail,
  AiOutlineTeam,
} from 'react-icons/ai';
import AdminNav from '../common/AdminNav';

interface Props {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', icon: AiOutlineDashboard, href: '/admin' },
  { label: 'Posts', icon: AiOutlineContainer, href: '/admin/posts' },
  { label: 'Users', icon: AiOutlineTeam, href: '/admin/users' },
  { label: 'Comments', icon: AiOutlineMail, href: '/admin/comments' },
];

const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="flex">
      <AdminNav navItems={navItems} />
      <div className="flex-1 p-4">{children}</div>
      {/* create button */}
      <Link href="/admin/post/create">
        <a className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark  fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition-transform">
          <AiOutlineFileAdd size={24} />
        </a>
      </Link>
    </div>
  );
};

export default AdminLayout;