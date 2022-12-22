import { useState } from "react";

const useItemCount = (alertContent: string) => {
  const [itemCount, setItemCount] = useState(0);

  const showAddForm = () => {
    if (itemCount >= 1) {
      alert(`${alertContent} 입력해주세요.`);
      return;
    }
    setItemCount((count) => count + 1);
  };

  const resetItemCountList = () => {
    setItemCount(0);
  };

  return [itemCount, showAddForm, resetItemCountList] as const;
};

export default useItemCount;
