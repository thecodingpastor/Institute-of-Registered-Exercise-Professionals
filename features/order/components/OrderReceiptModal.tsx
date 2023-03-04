import Image from "next/image";

import Modal from "../../../components/modal/Modal";
import { PlaceholderURL } from "../../../fetchConfig/store";

import classes from "./OrderReceiptModal.module.scss";

const OrderReceiptModal = ({ image, isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={classes.Container}>
        <Image
          alt="Receipt"
          fill
          src={image}
          blurDataURL={PlaceholderURL}
          placeholder="blur"
        />
      </div>
    </Modal>
  );
};

export default OrderReceiptModal;
