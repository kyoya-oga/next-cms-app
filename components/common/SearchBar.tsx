import { FC } from 'react';

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
  return (
    <input
      type="text"
      className="border-2 bg-transparent border-secondary-dark p-2 dark:text-primary text-primary-dark rounded focus:border-primary-dark dark:focus:border-primary outline-none"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
