import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import {
  salesLoading,
  todaySalesList,
} from "redux/sales/dailySales/dailySalesSlice";
import { CURRENCY_FORMATTER } from "hooks/useCurrency";
import { getOneMonthSalesAsync } from "redux/sales/dailySales/dailySalesThunk";
import useItemCount from "hooks/useItemCount";
import TodaySalesList from "components/sales/dailySales/TodaySalesList";
import Loading from "components/layout/Loading";

const TodaySalesListContainer = () => {
  const todaySales = useAppSelector(todaySalesList);
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  const [itemCount, showAddForm, resetItemCount] = useItemCount("오늘 매출을");

  const loading = useAppSelector(salesLoading);

  //오늘 매출 금액 총 합계
  const todayTotalSales = useMemo(() => {
    let todayTotalSalesList: number[] = [];
    todaySales.forEach((el) => {
      const onlyNumberSales = el.totalSales.replace(/[^0-9]/g, "");
      todayTotalSalesList.push(Number(onlyNumberSales));
    });
    const sum = todayTotalSalesList.reduce((acc, cur) => acc + cur, 0);
    return CURRENCY_FORMATTER.format(sum);
  }, [todaySales]);

  useEffect(() => {
    if (todaySales.length === 0) {
      try {
        dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
      } catch {
        alert("오늘 매출 데이터를 가져오지 못했습니다. 다시 시도해주세요.");
      }
    }
  }, [dispatch, userUid, todaySales.length]);

  if (loading === "pending") return <Loading />;

  return (
    <TodaySalesList
      todaySalesList={todaySales}
      todayTotalSales={todayTotalSales}
      itemCount={itemCount}
      showAddForm={showAddForm}
      resetItemCount={resetItemCount}
    />
  );
};

export default TodaySalesListContainer;
