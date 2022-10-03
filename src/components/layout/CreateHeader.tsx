import styles from "styles/layout/CreateHeader.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

interface Props {
  title: string;
  linkAddress: string;
  linkName: string;
}

const CreateHeader = ({ title, linkAddress, linkName }: Props) => {
  return (
    <section className={styles.header}>
      <div className={styles.headerInner}>
        <span className={styles.breadcrumb}>
          <Link to={linkAddress}>{linkName}</Link>
          &gt; {title}
        </span>
        <div>{title}</div>
      </div>
    </section>
  );
};

export default memo(CreateHeader);
