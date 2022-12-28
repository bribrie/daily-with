import { MouseEventHandler } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { NoticeListType } from "redux/types";
import { THIS_MONTH } from "utilites/Date";
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
        <div className={styles.title}>{THIS_MONTH}월 공지사항</div>
        {noticeList.length === 0 ? (
          <div className={styles.noneContainer}>
            <div>등록된 공지가 없습니다.</div>
            <div>추가하기</div>
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
                  <>
                    <div
                      onClick={handleUpdateOrderNumber}
                      className={styles.saveBtn}
                    >
                      저장하기
                    </div>
                    <div onClick={handleCancel} className={styles.saveBtn}>
                      취소
                    </div>
                  </>
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
