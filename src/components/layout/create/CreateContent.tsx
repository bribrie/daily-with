import { ReactNode } from "react";
import styles from "styles/layout/create/CreateContent.module.scss";

interface ContentProps {
  idx: string;
  title?: string;
  children: ReactNode;
}

const CreateContent = ({ idx, title, children }: ContentProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.idx}>{idx}</div>
      <div className={styles.info}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {children}
      </div>
    </div>
  );
};

export default CreateContent;
