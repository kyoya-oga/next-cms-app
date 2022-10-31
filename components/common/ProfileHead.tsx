import classNames from 'classnames';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const commonClasses =
  'relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none';

const ProfileHead: FC<Props> = ({
  avatar,
  lightOnly,
  nameInitial,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark dark:bg-primary text-primary dark:text-primary-dark';
  }, [lightOnly]);

  return (
    <span className="flex items-center">
      <span className={classNames(commonClasses, getStyle())}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="profile" />
        ) : (
          nameInitial
        )}
      </span>

      <AiFillCaretDown
        className={
          lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'
        }
      />
    </span>
  );
};

export default ProfileHead;
