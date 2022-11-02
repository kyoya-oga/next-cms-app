import classNames from 'classnames';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';

interface Props {
  initialValue?: string;
  onChange(file: File): void;
}

const commonClasses =
  'border border-dashed border-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video text-secondary-dark dark:text-secondary-light';

const ThumbnailSelector: FC<Props> = ({
  initialValue,
  onChange,
}): JSX.Element => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    setSelectedThumbnail(URL.createObjectURL(file));
    onChange(file);
  };

  useEffect(() => {
    if (typeof initialValue === 'string') setSelectedThumbnail(initialValue);
  }, [initialValue]);

  return (
    <div className="w-32">
      <label htmlFor="thumbnail">
        <input
          className="visually-hidden"
          type="file"
          accept="image/*"
          id="thumbnail"
          aria-labelledby="upload thumbnail"
          onChange={handleChange}
        />
        {selectedThumbnail ? (
          <img
            src={selectedThumbnail}
            alt="Thumbnail"
            className={classNames(commonClasses, 'object-cover')}
          />
        ) : (
          <PosterUI label="Thumbnail" />
        )}
      </label>
    </div>
  );
};

interface PosterUIProps {
  label: string;
  className?: string;
}

const PosterUI: FC<PosterUIProps> = ({ label, className }) => {
  return (
    <div className={classNames(commonClasses, className)}>
      <span>{label}</span>
    </div>
  );
};

export default ThumbnailSelector;
