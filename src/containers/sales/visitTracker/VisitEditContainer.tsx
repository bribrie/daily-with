import { useParams } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import {
  allVisitList,
  oneMonthVisitList,
} from "redux/sales/visitTracker/visitSlice";
import VisitFormContainer from "./VisitFormContainer";

const VisitEditContainer = () => {
  const { id } = useParams();
  const editItemOfMonthList = useAppSelector(oneMonthVisitList).filter(
    (el) => el.id === id
  )[0];
  const editItemOfAllList = useAppSelector(allVisitList).filter(
    (el) => el.id === id
  )[0];

  if (editItemOfAllList) {
    return <VisitFormContainer editItem={editItemOfAllList} />;
  }

  return <VisitFormContainer editItem={editItemOfMonthList} />;
};

export default VisitEditContainer;
