import axios from 'axios';
import { NextPage } from 'next';
import Editor, { FinalPost } from '../../../components/editor';
import AdminLayout from '../../../components/layout/AdminLayout';

interface Props {}

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = new FormData();
      for (let key in post) {
        const value = (post as any)[key];
        // because tags are an array of string
        if (key === 'tags' && value.trim()) {
          const tags = value.split(',').map((tag: string) => tag.trim());
          formData.append('tags', JSON.stringify(tags));
        } else {
          formData.append(key, value);
        }
      }
      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={handleSubmit}
          initialValue={{
            title: 'Hello World',
            content: '<h1>Hello World</h1>',
            meta: 'meta',
            slug: 'slug',
            tags: 'tags',
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
