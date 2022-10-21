import { MouseEventHandler } from "react";
import Portal from "./Portal";
import styles from "styles/common/modal/Modal.module.scss";

interface ModalProps {
  message: string;
  onConfirm: MouseEventHandler;
  onClose: MouseEventHandler;
}

const Modal = ({ message, onConfirm, onClose }: ModalProps) => {
  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.backdrop} onClick={onClose}>
          <div className={styles.container}>
            <div className={styles.messageWrapper}>
              <div>{message}</div>
            </div>
            <div className={styles.buttonWrapper}>
              <button onClick={onConfirm}>확인</button>
              <button onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
