import { MouseEventHandler } from "react";
import { VisitListType } from "redux/sales/salesTypes";
import VisitItemContainer from "containers/sales/visitTracker/VisitItemContainer";
import VisitFormContainer from "containers/sales/visitTracker/VisitFormContainer";
import VisitHeader from "./VisitHeader";
import styles from "styles/sales/visitTracker/VisitList.module.scss";

interface ListProps {
  list: VisitListType[];
  itemCount: number;
  showAddForm: MouseEventHandler;
  resetItemCount: () => void;
  filterValue: string;
}

const VisitList = ({
  list,
  itemCount,
  showAddForm,
  resetItemCount,
  filterValue,
}: ListProps) => {
  return (
    <div className={styles.wrapper}>
      <VisitHeader />
      {list.length === 0 && itemCount === 0 ? (
        <div className={styles.info}>등록된 데이터가 없습니다.</div>
      ) : (
        <>
          {list.map((data) => (
            <VisitItemContainer
              key={data.id}
              visitList={data}
              filterValue={filterValue}
            />
          ))}
        </>
      )}
      {itemCount >= 1 ? (
        <VisitFormContainer
          resetItemCount={resetItemCount}
          filterValue={filterValue}
        />
      ) : (
        <div className={styles.buttonWrapper}>
          <button onClick={showAddForm}>방문 경로 추가</button>
        </div>
      )}
    </div>
  );
};

export default VisitList;
