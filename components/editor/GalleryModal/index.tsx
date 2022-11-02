import Image from 'next/image';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import ActionButton from '../../common/ActionButton';
import ModalContainer, { ModalProps } from '../../common/ModalContainer';
import CustomImage from './CustomImage';
import Gallery from './Gallery';

export interface ImageSelectionResults {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  images: { src: string }[];
  onFileSelect(image: File): void;
  onSelect(result: ImageSelectionResults): void;
  uploading?: boolean;
}

const GalleryModal: FC<Props> = ({
  images,
  visible,
  onClose,
  onFileSelect,
  onSelect,
  uploading,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState('');
  const [altText, setAltText] = useState('');

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith('image')) return handleClose();

    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText });
    handleClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl w-full p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          <div className="basis-3/4 max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-[rgb(202,181,226)]">
            <Gallery
              images={images}
              onSelect={(src) => setSelectedImage(src)}
              selectedImage={selectedImage}
              uploading={uploading}
            />
          </div>
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="image-input">
                  <input
                    onChange={handleOnImageChange}
                    className="visually-hidden"
                    type="file"
                    id="image-input"
                    aria-labelledby="upload image"
                  />

                  <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 cursor-pointer p-2 rounded">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-2"
                    placeholder="Alt text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                  ></textarea>
                  <ActionButton onClick={handleSelection} title="Select" />
                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      layout="fill"
                      objectFit="contain"
                      alt="selected"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
