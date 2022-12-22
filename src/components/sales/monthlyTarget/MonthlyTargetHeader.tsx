import styles from "styles/sales/monthlyTarget/MonthlyTargetHeader.module.scss";

const MonthlyTargetHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.month}>기간</div>
      <div className={styles.type}>종목</div>
      <div className={styles.new}>신규 목표</div>
      <div className={styles.reRegister}>재등록 목표</div>
      <div className={styles.totalSales}>목표 총 매출</div>
    </div>
  );
};

export default MonthlyTargetHeader;
