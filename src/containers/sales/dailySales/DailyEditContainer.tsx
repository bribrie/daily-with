import { useParams } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import { allSalesList } from "redux/sales/dailySales/dailySalesSlice";
import DailyFormContainer from "./DailyFormContainer";

const DailyEditContainer = () => {
  const { id } = useParams();
  const editData = useAppSelector(allSalesList).filter((el) => el.id === id)[0];

  return <DailyFormContainer type="edit" editData={editData} />;
};

export default DailyEditContainer;
