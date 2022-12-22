import { ChangeEvent, useState } from "react";

const useFilter = (filterData: string[]) => {
  const [filterValue, setFilterValue] = useState(filterData[0]);

  const handleFilterChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value as string);
  };

  return [filterValue, handleFilterChange] as const;
};

export default useFilter;
