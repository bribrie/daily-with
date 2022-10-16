import { ReactNode } from "react";
import styles from "styles/layout/CreateContent.module.scss";

interface FromProps {
  idx: string;
  title?: string;
  children: ReactNode;
}

const CreateContent = ({ idx, title, children }: FromProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.idx}>{idx}</div>
      <div className={styles.info}>
        {title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default CreateContent;
