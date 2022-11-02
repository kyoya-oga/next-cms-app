import Image from 'next/image';
import { FC } from 'react';
import CheckMark from '../../common/CheckMark';

interface Props {
  src: string;
  selected?: boolean;
  onClick?(): void;
  alt?: string;
}

const CustomImage: FC<Props> = ({
  src,
  selected,
  onClick,
  alt = 'gallery',
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="relative rounded overflow-hidden cursor-pointer"
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt={alt}
        className="bg-secondary-light hover:scale-110 transition-transform"
        objectFit="cover"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default CustomImage;
