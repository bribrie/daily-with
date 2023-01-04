import CountChart from "./CountChart";
import styles from "styles/dashboard/RegistrationCount.module.scss";

interface CountProps {
  todaySalesCount: number;
  totalRegister: number;
  totalNewCount: number;
  newPercentage: number;
  totalReRegisterCount: number;
  rePercentage: number;
}

const RegistrationCount = ({
  todaySalesCount,
  totalRegister,
  totalNewCount,
  newPercentage,
  totalReRegisterCount,
  rePercentage,
}: CountProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.itemWrapper}>
        <CountChart width={50} height={50} dataPercentage={100} type="Today" />
        <div className={styles.contentWrapper}>
          <div className={styles.count}>{todaySalesCount}명</div>
          <div className={styles.title}>오늘 등록 회원</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <CountChart width={50} height={50} dataPercentage={100} type="Total" />
        <div className={styles.contentWrapper}>
          <div className={styles.count}>{totalRegister}명</div>
          <div className={styles.title}>당월 총 등록 수</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <CountChart
          width={50}
          height={50}
          dataPercentage={newPercentage}
          type="newPercentage"
        />
        <div className={styles.contentWrapper}>
          <div className={styles.count}>{totalNewCount}명</div>
          <div className={styles.title}>당월 총 신규등록</div>
        </div>
      </div>
      <div className={styles.itemWrapper}>
        <CountChart
          width={50}
          height={50}
          dataPercentage={rePercentage}
          type="rePercentage"
        />
        <div className={styles.contentWrapper}>
          <div className={styles.count}>{totalReRegisterCount}명</div>
          <div className={styles.title}>당월 총 재등록</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCount;
