import { BubbleMenu, Editor } from '@tiptap/react';
import { FC, useCallback, useState } from 'react';
import { BiUnlink } from 'react-icons/bi';
import { BsBoxArrowRight, BsPencilSquare } from 'react-icons/bs';
import LinkForm, { LinkOption } from './LinkForm';

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes('link');
    if (href) window.open(href, '_blank');
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const handleSubmit = ({ url, openInNewTab }: LinkOption) => {
    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? '_blank' : '_self' })
      .run();
    setShowEditForm(false);
  };

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes('link');
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive('link')}
      editor={editor}
      tippyOptions={{
        onHidden: () => setShowEditForm(false),
        appendTo: 'parent',
      }}
    >
      <LinkForm
        visible={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditForm ? (
        <div className="rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow p-3 flex items-center space-x-6 z-30">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowRight />
          </button>
          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>
          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      ) : null}
    </BubbleMenu>
  );
};

export default EditLink;
