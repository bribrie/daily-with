import { ReactComponent as Filter } from "assets/images/Filter.svg";
import { ChangeEventHandler } from "react";
import styles from "styles/common/ui/FilterBar.module.scss";

interface FilterProps {
  filterData: string[];
  selectedData?: ChangeEventHandler;
}

const FilterBar = ({ filterData, selectedData }: FilterProps) => {
  return (
    <div className={styles.container}>
      <Filter fill="gray" />
      <select
        className={styles.listWrapper}
        onChange={selectedData ? selectedData : undefined}
      >
        {filterData.map((data, idx) => (
          <option key={idx}>{data}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
