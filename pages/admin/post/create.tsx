import { NextPage } from 'next';
import Editor from '../../../components/editor';
import AdminLayout from '../../../components/layout/AdminLayout';

interface Props {}

const Create: NextPage<Props> = () => {
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={(post) => console.log(post)}
          initialValue={{
            title: 'Hello',
            content: '<h1>Hello</h1>',
            meta: 'Meta',
            tags: 'Tags',
            slug: 'Slug',
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
