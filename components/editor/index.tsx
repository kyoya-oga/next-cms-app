import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, getMarkRange, Range, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FC, useEffect, useState } from 'react';
import GalleryModal, { ImageSelectionResults } from './GalleryModal';
import EditLink from './link/EditLink';
import ToolBar from './ToolBar';

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto',
        },
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      Placeholder.configure({ placeholder: 'Start writing...' }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: 'mx-auto rounded',
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, _event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) {
          setSelectionRange(selectionRange);
        }
      },
      attributes: {
        class:
          'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
      },
    },
  });

  const handleImageSelection = (result: ImageSelectionResults) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  // todo
  const handleImageUpload = (file: File) => {};

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <ToolBar
          editor={editor}
          onOpenImageClick={() => setShowGallery(true)}
        />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3"></div>
        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        onFileSelect={handleImageUpload}
      />
    </>
  );
};

export default Editor;
