import { ChangeEventHandler } from "react";
import { SalesListType } from "redux/sales/salesTypes";
import DailySalesLayout from "./DailySalesLayout";
import DailyFormContainer from "containers/sales/dailySales/DailyFormContainer";
import FilterBar from "components/common/ui/FilterBar";
import DailySalesItemContainer from "containers/sales/dailySales/DailySalesItemContainer";
import styles from "styles/sales/dailySales/TodaySalesList.module.scss";

interface Props {
  allSalesList: SalesListType[];
  itemCount: number;
  showAddForm: () => void;
  resetItemCount: () => void;
  filterData: string[];
  handleFilterChange: ChangeEventHandler;
}

const AllSalesList = ({
  allSalesList,
  itemCount,
  showAddForm,
  resetItemCount,
  filterData,
  handleFilterChange,
}: Props) => {
  return (
    <>
      <FilterBar filterData={filterData} selectedData={handleFilterChange} />
      <DailySalesLayout>
        {itemCount >= 1 ? (
          <DailyFormContainer
            type="all"
            resetItemCount={resetItemCount}
            allSalesList={allSalesList}
          />
        ) : (
          <>
            {allSalesList.length === 0 ? (
              <div className={styles.noneContent}>등록된 매출이 없습니다.</div>
            ) : (
              <>
                {allSalesList.map((data) => (
                  <DailySalesItemContainer
                    key={data.id}
                    itemType="salesLast"
                    savedSalesList={data}
                  />
                ))}
              </>
            )}
            <div className={styles.addButtonWrapper}>
              <button onClick={showAddForm}>이전 매출 추가하기</button>
            </div>
          </>
        )}
      </DailySalesLayout>
    </>
  );
};

export default AllSalesList;
