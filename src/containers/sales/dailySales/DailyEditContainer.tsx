import { useParams } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import {
  allSalesList,
  oneMonthSalesList,
} from "redux/sales/dailySales/dailySalesSlice";
import DailyFormContainer from "./DailyFormContainer";

const DailyEditContainer = () => {
  const { id } = useParams();
  const allList = useAppSelector(allSalesList);
  const oneMonthList = useAppSelector(oneMonthSalesList);

  const editData =
    allList.length === 0
      ? oneMonthList.filter((el) => el.id === id)[0]
      : allList.filter((el) => el.id === id)[0];

  return <DailyFormContainer type="edit" editData={editData} />;
};

export default DailyEditContainer;
