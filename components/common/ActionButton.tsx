import { FC, MouseEventHandler } from 'react';
import { BiLoader } from 'react-icons/bi';

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton: FC<Props> = ({
  title,
  busy = false,
  disabled,
  onClick,
}): JSX.Element => {
  return (
    <button
      className="text-highlight-dark bg-action px-6 py-2 font-semibold hover:scale-95 duration-100 rounded w-full flex items-center justify-center space-x-2 translate-all"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{title}</span>
      {busy ? <BiLoader className="animate-spin" size={20} /> : null}
    </button>
  );
};

export default ActionButton;
