import { NextPage } from 'next';
import AdminLayout from '../../components/layout/AdminLayout';

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout title="Admin">
      <div>admin</div>
    </AdminLayout>
  );
};

export default Admin;
