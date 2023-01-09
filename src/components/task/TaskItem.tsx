import { Link } from "react-router-dom";
import { useState, MouseEventHandler } from "react";
import { TaskListType } from "redux/types";
import LabelBox from "components/common/ui/LabelBox";
import Modal from "components/common/modal/Modal";
import styles from "styles/task/TaskItem.module.scss";

interface itemProps extends Omit<TaskListType, "part"> {
  handleDelete: MouseEventHandler;
  handleModalOpen: (id: string) => void;
  isModalOpen: boolean;
}

const TaskItem = ({
  id,
  title,
  detail,
  day,
  time,
  specialDate,
  handleDelete,
  handleModalOpen,
  isModalOpen,
}: itemProps) => {
  const [hideButton, setHideButton] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal message="정말 삭제하시겠습니까?" onConfirm={handleDelete} />
      )}
      <div
        className={styles.wrapper}
        onClick={() => setHideButton((prev) => !prev)}
      >
        {hideButton ? (
          <div className={styles.buttonWrapper}>
            <div>
              <Link to={`${id}`}>수정</Link>
            </div>
            <div onClick={() => handleModalOpen(id as string)}>삭제</div>
          </div>
        ) : null}
        <div className={styles.labelWrapper}>
          {specialDate !== "" ? (
            <div className={styles.dateWrapper}>{specialDate}</div>
          ) : (
            <LabelBox list={day} />
          )}
        </div>
        <div className={styles.timeWrapper}>{time}</div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{title}</div>
          <div className={styles.detail}>{detail}</div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
