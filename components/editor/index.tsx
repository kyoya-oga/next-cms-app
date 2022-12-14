import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, getMarkRange, Range, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import useEditorConfig from '../../hooks/useEditorConfig';
import ActionButton from '../common/ActionButton';
import GalleryModal, { ImageSelectionResults } from './GalleryModal';
import EditLink from './link/EditLink';
import SEOForm, { SeoResult } from './SEOForm';
import ThumbnailSelector from './ThumbnailSelector';
import ToolBar from './ToolBar';

export interface FinalPost extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: FinalPost;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
  onSubmit,
  initialValue,
  btnTitle = 'Submit',
  busy = false,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: '',
    content: '',
    meta: '',
    tags: '',
    slug: '',
  });

  const fetchImages = async () => {
    const { data } = await axios('/api/image');
    setImages(data.images);
  };

  const { editor } = useEditorConfig();

  const handleImageSelection = (result: ImageSelectionResults) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: result.src, alt: result.altText })
      .run();
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await axios.post('/api/image', formData);
    setUploading(false);

    setImages([data, ...images]);
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setPost({ ...post, title: target.value });
  };

  const updateSeoValues = (result: SeoResult) => {
    setPost({ ...post, ...result });
  };

  const updateThumbnail = (file: File) => {
    setPost({ ...post, thumbnail: file });
  };

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);

      const { meta, slug, tags } = initialValue;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          {/* Thumbnail */}
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton
                busy={busy}
                title={btnTitle}
                onClick={handleSubmit}
              />
            </div>
          </div>
          {/* Title */}
          <input
            type="text"
            className="py-2 bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
            placeholder="Title"
            onChange={updateTitle}
            value={post.title}
          />
          <ToolBar
            editor={editor}
            onOpenImageClick={() => setShowGallery(true)}
          />
          <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3"></div>
        </div>
        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3"></div>
        <SEOForm
          onChange={updateSeoValues}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        images={images}
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
