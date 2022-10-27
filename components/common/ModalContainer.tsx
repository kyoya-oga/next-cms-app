import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useId,
} from 'react';

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  visible,
  children,
  onClose,
}): JSX.Element | null => {
  // prevent event bubbling
  const containerId = useId();
  const handleClose = useCallback(() => {
    onClose ? onClose() : null;
  }, [onClose]);

  const handleClick = (e: any) => {
    if (e.target.id === containerId) {
      handleClose();
    }
  };

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
