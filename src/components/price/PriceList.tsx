import CreateButton from "components/layout/CreateButton";
import { PriceListType } from "redux/types";
import PriceItemContainer from "containers/price/PriceItemContainer";
import styles from "styles/price/PriceList.module.scss";
import { KeyboardEventHandler } from "react";

interface ListProps {
  list: PriceListType[];
  handleSearch: KeyboardEventHandler;
}

const PriceList = ({ list, handleSearch }: ListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.count}>총 {list.length} 개의 이용권</h1>
        <input
          type="text"
          placeholder="이용권명 검색"
          className={styles.searchBar}
          onKeyPress={handleSearch}
        />
      </div>
      {list.length === 0 ? (
        <>
          <div className={styles.textWrapper}>등록된 이용권이 없습니다.</div>
        </>
      ) : (
        <div className={styles.itemWrapper}>
          {list.map((data) => (
            <PriceItemContainer
              id={data.id}
              key={data.title}
              type={data.type}
              title={data.title}
              period={data.period}
              price={data.price}
              event={data.event}
              delay={data.delay}
            />
          ))}
        </div>
      )}
      <CreateButton />
    </div>
  );
};

export default PriceList;
