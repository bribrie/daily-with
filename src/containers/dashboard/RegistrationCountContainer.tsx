import { useEffect } from "react";
import { getOneMonthSalesAsync } from "redux/sales/dailySales/dailySalesThunk";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  thisMonthHealthSales,
  todaySalesCount,
  totalNewCount,
  totalReCount,
  totalRegister,
} from "redux/sales/dailySales/dailySalesSlice";
import RegistrationCount from "components/dashboard/RegistrationCount";

const RegistrationCountContainer = () => {
  const userUid = useAppSelector(currentUserUid);
  const thisMonthHealthSalesList = useAppSelector(thisMonthHealthSales);
  const totalNewRegisterCount = useAppSelector(totalNewCount);
  const totalReRegisterCount = useAppSelector(totalReCount);
  const totalRegisterCount = useAppSelector(totalRegister);
  const todaySales = useAppSelector(todaySalesCount);
  const dispatch = useAppDispatch();

  const newPercentage = Math.round(
    (totalNewRegisterCount / totalRegisterCount) * 100
  );
  const rePercentage = Math.round(
    (totalReRegisterCount / totalRegisterCount) * 100
  );

  useEffect(() => {
    if (thisMonthHealthSalesList.length === 0) {
      dispatch(getOneMonthSalesAsync({ userUid }));
    }
  }, [thisMonthHealthSalesList.length, dispatch, userUid]);

  return (
    <RegistrationCount
      todaySalesCount={todaySales}
      totalRegister={totalRegisterCount}
      totalNewCount={totalNewRegisterCount}
      newPercentage={isNaN(newPercentage) ? 0 : newPercentage}
      rePercentage={isNaN(rePercentage) ? 0 : rePercentage}
      totalReRegisterCount={totalReRegisterCount}
    />
  );
};

export default RegistrationCountContainer;
