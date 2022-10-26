import { NextPage } from 'next';
import AdminLayout from '../../components/layout/AdminLayout';

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div>admin</div>
    </AdminLayout>
  );
};

export default Admin;
