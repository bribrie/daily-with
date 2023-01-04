import { TODAY } from "utilites/Date";
import RegistrationCountContainer from "containers/dashboard/RegistrationCountContainer";
import SalesChart from "./SalesChart";
import TargetChart from "./TargetChart";
import MonthlyNoticeContainer from "containers/dashboard/MonthlyNoticeContainer";
import TimeTaskContainer from "containers/dashboard/TimeTaskContainer";
import styles from "styles/dashboard/DashboardLayout.module.scss";

const DashboardLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.container}>
        <div className={styles.dayWrapper}>{TODAY}</div>
        <RegistrationCountContainer />
        <SalesChart />
        <TargetChart />
        <MonthlyNoticeContainer />
        <TimeTaskContainer />
      </div>
    </div>
  );
};

export default DashboardLayout;
