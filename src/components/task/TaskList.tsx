import { KeyboardEventHandler, MouseEventHandler } from "react";
import { TaskListType } from "redux/types";
import SearchBar from "components/common/ui/SearchBar";
import TaskItemContainer from "containers/task/TaskItemContainer";
import styles from "styles/task/TaskList.module.scss";

interface ListProps {
  list: TaskListType[];
  searchHandler: KeyboardEventHandler;
  handleReset: MouseEventHandler;
}

const TaskList = ({ list, searchHandler, handleReset }: ListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <SearchBar
          placeholder="업무 제목을 입력하세요."
          handleSearch={searchHandler}
          handleReset={handleReset}
        />
      </div>
      {list.length === 0 ? (
        <div className={styles.noneContainer}>등록된 업무가 없습니다.</div>
      ) : (
        <>
          <div className={styles.taskHeader}>
            <div className={styles.date}>날짜</div>
            <div className={styles.time}>시간</div>
            <div className={styles.dateAndTime}>날짜/시간</div>
            <div className={styles.content}>업무 내용</div>
          </div>
          <div className={styles.listWrapper}>
            {list.map((data) => (
              <TaskItemContainer
                key={data.id}
                id={data.id}
                title={data.title}
                detail={data.detail}
                day={data.day}
                time={data.time}
                specialDate={data.specialDate}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
