import classNames from 'classnames';
import { FC } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import ModalContainer, { ModalProps } from './ModalContainer';

interface Props extends ModalProps {
  title: string;
  subTitle?: string;
  onConfirm?(): void;
  onCancel?(): void;
  busy?: boolean;
}

const commonBtnClasses = 'px-3 py-1 rounded text-white';

const ConfirmModal: FC<Props> = ({
  visible,
  onClose,
  title,
  subTitle,
  onCancel,
  onConfirm,
  busy = false,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary rounded p-3 ">
        <p className="font-semibold text-lg">{title}</p>
        <p>{subTitle}</p>
        <div className="pt-3">
          {busy ? (
            <p className="flex items-center space-x-2">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait...</span>
            </p>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={onConfirm}
                className={classNames(commonBtnClasses, 'bg-red-500')}
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                className={classNames(commonBtnClasses, 'bg-blue-500')}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
