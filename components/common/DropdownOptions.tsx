import { FC, ReactNode, useState } from 'react';

export type DropDownOptions = { label: string; onClick(): void }[];

interface Props {
  options: DropDownOptions;
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onMouseDown={() => setShowOptions(!showOptions)}
      className="relative"
    >
      {head}
      {showOptions ? (
        <span className="min-w-max absolute top-full mt-4 right-2 z-30 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => {
              return (
                <li
                  key={label + index}
                  onMouseDown={onClick}
                  className="hover:opacity-80 text-primary-dark dark:text-primary"
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </span>
      ) : null}
    </button>
  );
};

export default DropdownOptions;
