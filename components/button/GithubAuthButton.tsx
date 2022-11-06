import classNames from 'classnames';
import { signIn } from 'next-auth/react';
import { FC, useCallback } from 'react';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
  lightOnly?: boolean;
}

const commonClasses =
  'flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-95 transition duration-100';

export const GithubAuthButton: FC<Props> = ({ lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark dark:bg-primary text-primary dark:text-primary-dark';
  }, [lightOnly]);

  const handleClick = async () => {
    await signIn('github');
  };
  return (
    <button
      onClick={handleClick}
      className={classNames(commonClasses, getStyle())}
    >
      <span>Continue with</span>
      <AiFillGithub size={24} />
    </button>
  );
};
