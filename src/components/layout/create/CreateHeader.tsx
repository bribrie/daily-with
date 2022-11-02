import { memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "styles/layout/create/CreateHeader.module.scss";

interface HeaderProps {
  title: string;
  linkAddress: string;
  linkName: string;
  children?: ReactNode;
}

const CreateHeader = ({
  title,
  linkAddress,
  linkName,
  children,
}: HeaderProps) => {
  return (
    <section className={styles.header}>
      <div className={styles.headerInner}>
        <span className={styles.breadcrumb}>
          <Link to={linkAddress}>{linkName}</Link>
          &gt; {title}
        </span>

        {children ? (
          <>{children}</>
        ) : (
          <div className={styles.title}>{title}</div>
        )}
      </div>
    </section>
  );
};

export default memo(CreateHeader);
