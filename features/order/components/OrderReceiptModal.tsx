import Image from "next/image";

import Modal from "../../../components/modal/Modal";

import classes from "./OrderReceiptModal.module.scss";

const OrderReceiptModal = ({ image, isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={classes.Container}>
        <Image alt="Receipt" fill src={image} />
      </div>
    </Modal>
  );
};

export default OrderReceiptModal;
