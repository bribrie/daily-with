import { ReactComponent as Filter } from "assets/images/Filter.svg";
import { ChangeEventHandler } from "react";
import styles from "styles/common/ui/FilterBar.module.scss";

interface FilterProps {
  filterData: string[];
  filterValue?: string;
  handleFilterChange?: ChangeEventHandler;
}

const FilterBar = ({
  filterData,
  filterValue,
  handleFilterChange,
}: FilterProps) => {
  return (
    <div className={styles.container}>
      <Filter fill="gray" />
      <select
        className={styles.listWrapper}
        defaultValue={filterValue}
        onChange={handleFilterChange ? handleFilterChange : undefined}
      >
        {filterData.map((data, idx) => (
          <option key={idx}>{data}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
