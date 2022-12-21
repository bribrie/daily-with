import styles from "styles/sales/visitTracker/VisitHeader.module.scss";

const VisitHeader = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.date}>날짜</div>
      <div className={styles.type}>종목</div>
      <div className={styles.workInHeader}>워크인</div>
      <div className={styles.offline}>오프라인</div>
      <div className={styles.online}>온라인</div>
      <div className={styles.friend}>지인추천</div>
      <div className={styles.reserveInHeaer}>예약 방문</div>
      <div className={styles.telIn}>TI</div>
      <div className={styles.naverIn}>N</div>
      <div className={styles.kakaoIn}>K</div>
      <div className={styles.totalVisitor}>총 방문 수</div>
      <div className={styles.registerVisitor}>등록 수</div>
    </div>
  );
};

export default VisitHeader;
