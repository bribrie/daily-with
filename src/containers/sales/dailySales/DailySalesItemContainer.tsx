import { memo } from "react";
import { AddSalesItemListType, SalesListType } from "redux/sales/salesTypes";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deleteSalesAsync,
  getAllSalesAsync,
  getOneMonthSalesAsync,
} from "redux/sales/dailySales/dailySalesThunk";
import { currentUserUid } from "redux/auth/authSlice";
import {
  modalId,
  modalOpen,
  modalSavedId,
  modalState,
} from "redux/common/modalSlice";
import DailySalesItem from "components/sales/dailySales/DailySalesItem";

export interface SalesItemProps {
  itemType: "salesToday" | "salesLast" | "added";
  savedSalesList: AddSalesItemListType | SalesListType;
  deleteAddedItem?: (id: number) => void;
  filterValue?: string;
}

const DailySalesItemContainer = ({
  itemType,
  savedSalesList,
  deleteAddedItem,
  filterValue,
}: SalesItemProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const isModalOpen = useAppSelector(modalState);
  const deleteId = useAppSelector(modalId);

  const handleModalOpen = (id: string) => {
    dispatch(modalOpen());
    dispatch(modalSavedId(id));
  };

  const deleteSalesListItem = async () => {
    try {
      if (itemType === "salesToday") {
        await dispatch(deleteSalesAsync({ userUid, id: deleteId })).unwrap();
      } else {
        await dispatch(deleteSalesAsync({ userUid, id: deleteId })).unwrap();
        if (filterValue === "전체") {
          await dispatch(getAllSalesAsync({ userUid })).unwrap();
          return;
        }
      }
      await dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
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
      isModalOpen={isModalOpen}
      handleModalOpen={handleModalOpen}
    />
  );
};

export default memo(DailySalesItemContainer);
