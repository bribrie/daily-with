import { Link } from "react-router-dom";
import { TaskListType } from "redux/types";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import styles from "styles/dashboard/TimeTask.module.scss";

interface Props {
  type: "오전" | "오후" | "주말";
  taskList: TaskListType[];
}

const TimeTask = ({ type, taskList }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>{type} 업무 리스트</div>
        {taskList.length === 3 ? (
          <div className={styles.all}>
            <Link to="/task">모두보기</Link>
          </div>
        ) : null}
      </div>
      <div className={styles.contentContainer}>
        {taskList.length === 0 ? (
          <div className={styles.noneContent}>
            <div>등록된 업무가 없습니다.</div>
            <div className={styles.addBtn}>
              <Plus fill="gray" />
              <Link to="/task">등록하기</Link>
            </div>
          </div>
        ) : (
          <>
            {taskList.map((el) => (
              <div key={el.id} className={styles.itemWrapper}>
                <div className={styles.time}>{el.time}</div>
                <div className={styles.task}>{el.title}</div>
                <div className={styles.detail}>{el.detail}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TimeTask;
