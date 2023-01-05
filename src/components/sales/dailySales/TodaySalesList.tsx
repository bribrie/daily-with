import { SalesListType } from "redux/sales/salesTypes";
import DailySalesLayout from "./DailySalesLayout";
import DailySalesItemContainer from "containers/sales/dailySales/DailySalesItemContainer";
import DailyFormContainer from "containers/sales/dailySales/DailyFormContainer";
import styles from "styles/sales/dailySales/TodaySalesList.module.scss";

interface Props {
  todaySalesList: SalesListType[];
  todayTotalSales: string;
  itemCount: number;
  showAddForm: () => void;
  resetItemCount: () => void;
}

const TodaySalesList = ({
  todaySalesList,
  todayTotalSales,
  itemCount,
  showAddForm,
  resetItemCount,
}: Props) => {
  return (
    <DailySalesLayout>
      {todaySalesList.length === 0 ? (
        <div className={styles.noneContent}>등록된 오늘 매출이 없습니다.</div>
      ) : (
        <>
          {todaySalesList.map((data) => (
            <DailySalesItemContainer
              key={data.id}
              itemType="salesToday"
              savedSalesList={data}
            />
          ))}
          {itemCount >= 1 ? (
            <DailyFormContainer
              type="today"
              resetItemCount={resetItemCount}
              todaySalesList={todaySalesList}
            />
          ) : null}
        </>
      )}
      <div className={styles.todayTotalSales}>
        <div>오늘 총 매출 : </div>
        <div className={styles.amount}>{todayTotalSales}원</div>
      </div>
      {/* 등록할 수 있는 종목이 3개이므로 다 등록하면 추가하기 버튼 안보여줌 */}
      {todaySalesList.length < 3 && itemCount <= 0 ? (
        <div className={styles.addButtonWrapper}>
          <button onClick={showAddForm}>오늘 매출 추가하기</button>
        </div>
      ) : null}
    </DailySalesLayout>
  );
};

export default TodaySalesList;
