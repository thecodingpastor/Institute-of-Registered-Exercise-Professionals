import Modal from "./Modal";
import Spin from "../loaders/Spin";

import classes from "./ConfirmModal.module.scss";

interface IProps {
  isOpen: boolean;
  message?: string;
  loading: boolean;
  closeButtonText?: any;
  close: () => void;
  proceedWithAction: Function;
}
const ConfirmModal: React.FC<IProps> = ({
  isOpen,
  close,
  loading,
  closeButtonText = "Delete",
  message = "Are you sure you want to proceed with this action?",
  proceedWithAction,
}) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={classes.Container}>
        <p>{message}</p>

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
