import { NextPage } from 'next';
import AdminLayout from '../../components/layout/AdminLayout';

interface Props {}

const Posts: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div>posts</div>
    </AdminLayout>
  );
};

export default Posts;
