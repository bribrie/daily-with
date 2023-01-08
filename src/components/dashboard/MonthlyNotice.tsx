import { MouseEventHandler } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { NoticeListType } from "redux/types";
import { THIS_MONTH } from "utilites/Date";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import styles from "styles/dashboard/MonthlyNotice.module.scss";

interface NoticeProps {
  noticeList: NoticeListType[];
  showAddForm: MouseEventHandler;
  showSavedButton: boolean;
  handleDragChange: (result: any) => void;
  handleUpdateOrderNumber: MouseEventHandler;
  handleCancel?: MouseEventHandler;
}

const MonthlyNotice = ({
  noticeList,
  showAddForm,
  showSavedButton,
  handleDragChange,
  handleUpdateOrderNumber,
  handleCancel,
}: NoticeProps) => {
  return (
    <DragDropContext onDragEnd={handleDragChange}>
      <div className={styles.container}>
        <div className={styles.title}>{THIS_MONTH}월 공지</div>
        {noticeList.length === 0 ? (
          <div className={styles.noneContent} onClick={showAddForm}>
            <div>등록된 공지가 없습니다.</div>
            <div className={styles.addBtn}>
              <Plus fill="gray" />
              추가하기
            </div>
          </div>
        ) : (
          <Droppable droppableId="noticeList">
            {(provided) => (
              <ul
                className={styles.noticeList}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {noticeList.map((item, idx) => (
                  <Draggable draggableId={item.id} index={idx} key={item.id}>
                    {(provided, snapshot) => {
                      return (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={
                            snapshot.isDragging
                              ? `${styles.item} ${styles.dragging}`
                              : styles.item
                          }
                        >
                          {item.content}
                        </li>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
                {showSavedButton ? (
                  <li className={styles.updateBtn}>
                    <div onClick={handleUpdateOrderNumber}>저장</div>
                    <div onClick={handleCancel}>취소</div>
                  </li>
                ) : (
                  <li
                    className={`${styles.item} ${styles.addBtn}`}
                    onClick={showAddForm}
                  >
                    추가 / 수정하기
                  </li>
                )}
              </ul>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
};

export default MonthlyNotice;
