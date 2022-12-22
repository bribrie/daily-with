import { memo } from "react";
import { AddSalesItemListType, SalesListType } from "redux/sales/salesTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deleteSalesAsync,
  getAllSalesAsync,
  getOneMonthSalesAsync,
} from "redux/sales/dailySales/dailySalesThunk";
import { currentUserUid } from "redux/auth/authSlice";
import DailySalesItem from "components/sales/dailySales/DailySalesItem";

export interface SalesItemProps {
  itemType: "salesToday" | "salesLast" | "added";
  savedSalesList: AddSalesItemListType | SalesListType;
  deleteAddedItem?: (id: number) => void;
}

const DailySalesItemContainer = ({
  itemType,
  savedSalesList,
  deleteAddedItem,
}: SalesItemProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);

  const deleteSalesListItem = async (id: string) => {
    try {
      if (itemType === "salesToday") {
        await dispatch(deleteSalesAsync({ userUid, id })).unwrap();
        await dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
      } else {
        await dispatch(deleteSalesAsync({ userUid, id })).unwrap();
        await dispatch(getAllSalesAsync({ userUid })).unwrap();
      }
    } catch {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <DailySalesItem
      itemType={itemType}
      savedSalesList={savedSalesList}
      deleteAddedItem={deleteAddedItem}
      deleteSalesListItem={deleteSalesListItem}
    />
  );
};

export default memo(DailySalesItemContainer);
