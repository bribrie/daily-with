import { useEffect } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  visitLoading,
  oneMonthVisitList,
} from "redux/sales/visitTracker/visitSlice";
import { getOneMonthVisitDataAsync } from "redux/sales/visitTracker/visitThunk";
import useItemCount from "hooks/useItemCount";
import Loading from "components/layout/Loading";
import VisitList from "components/sales/visitTracker/VisitList";

const VisitListContainer = () => {
  const userUid = useAppSelector(currentUserUid);
  const list = useAppSelector(oneMonthVisitList);
  const dispatch = useAppDispatch();
  const [itemCount, showAddForm, resetItemCount] = useItemCount("방문 경로를");
  const loading = useAppSelector(visitLoading);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getOneMonthVisitDataAsync({ userUid }));
    }
  }, [list.length, dispatch, userUid]);

  if (loading === "pending") {
    <Loading />;
  }

  return (
    <VisitList
      list={list}
      itemCount={itemCount}
      showAddForm={showAddForm}
      resetItemCount={resetItemCount}
    />
  );
};

export default VisitListContainer;
