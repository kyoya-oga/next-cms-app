import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import Button from '../ToolBar/Button';
import LinkForm, { LinkOption } from './LinkForm';

interface Props {
  onSubmit(link: LinkOption): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (link: LinkOption) => {
    if (!link.url.trim()) return setVisible(false);

    onSubmit(link);
    setVisible(false);
  };
  return (
    <div
      onKeyDown={({ key }) => {
        key === 'Escape' ? setVisible(false) : null;
      }}
      className="relative"
    >
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full right-0 mt-4 z-20">
        <LinkForm onSubmit={handleSubmit} visible={visible} />
      </div>
    </div>
  );
};

export default InsertLink;
