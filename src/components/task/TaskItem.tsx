import { Link } from "react-router-dom";
import { useState, MouseEventHandler } from "react";
import { TaskListType } from "redux/types";
import { ReactComponent as Trash } from "assets/images/Trash.svg";
import { ReactComponent as Pencil } from "assets/images/Pencil.svg";
import LabelBox from "components/common/ui/LabelBox";
import styles from "styles/task/TaskItem.module.scss";

interface itemProps extends Omit<TaskListType, "part"> {
  handleDelete: MouseEventHandler;
}

const TaskItem = ({
  id,
  title,
  detail,
  day,
  time,
  specialDate,
  handleDelete,
}: itemProps) => {
  const [hide, setHide] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelWrapper}>
        {specialDate !== "" ? (
          <div className={styles.dateWrapper}>{specialDate}</div>
        ) : (
          <LabelBox list={day} />
        )}
      </div>
      <div className={styles.timeWrapper}>{time}</div>
      <div
        className={styles.contentWrapper}
        onMouseEnter={() => setHide(true)}
        onMouseLeave={() => setHide(false)}
      >
        <div className={styles.titleWrapper}>{title}</div>
        <div className={styles.detailWrapper}>{detail}</div>
        <div className={styles.buttonWrapper}>
          {hide ? (
            <>
              <Link to={`${id}`}>
                <button>
                  <Pencil stroke="gray" />
                </button>
              </Link>
              <button onClick={handleDelete}>
                <Trash stroke="gray" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
