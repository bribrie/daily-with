import { KeyboardEvent, useCallback, useState } from "react";

const useSearch = () => {
  const [value, setValue] = useState("");

  const handleSearch = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setValue(e.target.value);
    }
  }, []);

  const handleReset = useCallback(() => {
    setValue("");
  }, []);

  return [value, handleSearch, handleReset] as const;
};

export default useSearch;
