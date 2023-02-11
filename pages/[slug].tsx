import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import Comments from '../components/common/Comments';
import DefaultLayout from '../components/layout/DefaultLayout';
import dbConnect from '../lib/dbConnect';
import Post from '../models/Post';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, slug, thumbnail, createdAt, id } = post;
  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pt-10">
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
        <h1 className="py-2 text-5xl font-semibold dark:text-primary text-primary-dark">
          {title}
        </h1>
        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {tags.map((tag, index) => (
            <span key={tag + index}>#{tag}</span>
          ))}
          <span>{dateFormat(createdAt, 'isoDate')}</span>
        </div>
        <div className="prose max-w-full dark:prose-invert mx-auto">
          <div>{parse(content)}</div>
        </div>
      </div>

      <Comments belongsTo={id} />
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
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
