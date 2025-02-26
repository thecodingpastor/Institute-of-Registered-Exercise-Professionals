import Modal from "./Modal";
import Spin from "../loaders/Spin";

import classes from "./ConfirmModal.module.scss";

interface IProps {
  isOpen: boolean;
  message?: string[];
  title?: string;
  loading: boolean;
  disableBackgroundClick?: boolean;
  closeButtonText?: any;
  close: () => void;
  proceedWithAction: Function;
}
const ConfirmModal: React.FC<IProps> = ({
  isOpen,
  close,
  title,
  loading,
  closeButtonText = "Delete",
  message = ["Are you sure you want to proceed with this action?"],
  proceedWithAction,
  disableBackgroundClick,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      close={close}
      disableBackgroundClick={disableBackgroundClick}
    >
      <div className={classes.Container}>
        {title && <h4>{title}</h4>}

        <ul>
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>

        {loading ? (
          <Spin />
        ) : (
          <span onClick={() => proceedWithAction()}>{closeButtonText}</span>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
