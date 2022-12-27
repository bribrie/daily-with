import { ReactNode } from "react";
import styles from "styles/company/CompanyHeader.module.scss";

interface Props {
  title: string;
  icon: JSX.Element;
  children: ReactNode;
}

const CompanyHeader = ({ title, icon, children }: Props) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.header}>
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
};

export default CompanyHeader;
