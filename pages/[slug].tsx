import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import DefaultLayout from '../components/layout/DefaultLayout';
import dbConnect from '../lib/dbConnect';
import Post from '../models/Post';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, slug, thumbnail, createdAt } = post;
  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pt-10 pb-20">
        {thumbnail ? (
          <div className="relative aspect-video">
            (
            <Image
              src={thumbnail}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
            )
          </div>
        ) : null}
        <div className="flex items-center justify-between py-2">
          {tags.map((tag, index) => (
            <span key={tag + index}>#{tag}</span>
          ))}
          <span>{dateFormat(createdAt, 'isoDate')}</span>
        </div>
        <div className="prose max-w-full dark:prose-invert mx-auto">
          <h1>{title}</h1>
          <div>{parse(content)}</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select('slug');
    const paths = posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    });
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: '/' } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}
export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };
    const { _id, title, content, meta, slug, tags, thumbnail, createdAt } =
      post;
    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || '',
          createdAt: createdAt.toString(),
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
