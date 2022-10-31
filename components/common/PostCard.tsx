import dateFormat from 'dateformat';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { PostDetail } from '../../utils/types';

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?: () => void;
}
const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + '...';
};

const PostCard: FC<Props> = ({
  post,
  busy,
  controls = false,
  onDeleteClick,
}): JSX.Element => {
  const { title, thumbnail, slug, tags, meta, createdAt } = post;
  return (
    <li className="bg-primary dark:bg-primary-dark flex flex-col h-full rounded shadow-sm shadow-secondary-dark overflow-hidden transition-colors">
      {/* Thumbnail */}
      <div className="aspect-video relative">
        {thumbnail ? (
          <Image src={thumbnail} layout="fill" alt="Thumbnail" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
            No Image
          </div>
        )}
      </div>
      {/* Post Info */}
      <div className="border-t p-2 flex-1 flex flex-col">
        <Link href={`/${slug}`}>
          <a>
            <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
              <div className="flex items-center space-x-2">
                {tags.map((tag, index) => (
                  <span key={tag + index}>#{tag}</span>
                ))}
              </div>
              <span>{dateFormat(createdAt, 'isoDate')}</span>
            </div>
            <h2 className="my-0.5 font-semibold text-primary-dark dark:text-primary">
              {trimText(title, 50)}
            </h2>
            <p className="text-secondary-dark">{trimText(meta, 70)}</p>
          </a>
        </Link>
        {controls ? (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
            {busy ? (
              <span className="animate-pulse">Removing</span>
            ) : (
              <>
                <Link href={`/admin/posts/update/${slug}`}>
                  <a className="hover:underline">Edit</a>
                </Link>
                <button onClick={onDeleteClick} className="hover:underline">
                  Delete
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default PostCard;
