import { EditorContent } from '@tiptap/react';
import { FC } from 'react';
import useEditorConfig from '../../hooks/useEditorConfig';
import ActionButton from './ActionButton';

interface Props {
  title?: string;
}

const CommentForm: FC<Props> = ({ title }): JSX.Element => {
  const { editor } = useEditorConfig({ placeholder: 'Add your comment...' });
  return (
    <div>
      {title ? (
        <h1 className="text-xl py-3 text-primary-dark dark:text-primary font-semibold">
          {title}
        </h1>
      ) : null}
      <EditorContent
        className="focus:outline-none min-h-[150px] p-2 border-2 border-secondary-dark rounded"
        editor={editor}
      />
      <div className="flex justify-end py-3">
        <div className="inline-block">
          <ActionButton title="Submit" />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
