import { useParams } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { targetList } from "redux/sales/monthlyTarget/targetSlice";
import MonthlyTargetFormContainer from "./MonthlyTargetFormContainer";

const MonthlyTargetEditContainer = () => {
  const { id } = useParams();
  const editItem = useAppSelector(targetList).filter((el) => el.id === id)[0];

  return <MonthlyTargetFormContainer editItem={editItem} />;
};

export default MonthlyTargetEditContainer;
