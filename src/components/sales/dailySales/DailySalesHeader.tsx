import styles from "styles/sales/dailySales/DailySalesHeader.module.scss";

const DailySalesHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.date}>날짜</div>
      <div className={styles.type}>종목</div>
      <div className={styles.registerCount}>등록 수</div>
      <div className={styles.newRegister}>신규</div>
      <div className={styles.reRegister}>재등록</div>
      <div className={styles.totalSales}>총 매출</div>
    </div>
  );
};

export default DailySalesHeader;
