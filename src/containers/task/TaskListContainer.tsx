import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentTask, getTaskAsync, taskLoading } from "redux/task/taskSlice";
import { TaskListType } from "redux/types";
import useSearch from "hooks/useSearch";
import Loading from "components/layout/Loading";
import TaskList from "components/task/TaskList";

const TaskListContainer = () => {
  const { name } = useParams();
  const part = name !== undefined ? name : "";
  const userUid = useAppSelector(currentUserUid);
  const taskList = useAppSelector(currentTask)[part];
  const [searchValue, searchHandler, handleReset] = useSearch();
  const loading = useAppSelector(taskLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskList.length === 0) {
      const tasks = { userUid, name };
      dispatch(getTaskAsync(tasks));
    }
    return;
  }, [dispatch, name, userUid, taskList.length]);

  const filteredList = useMemo(() => {
    return taskList.filter((el: TaskListType) =>
      el.title.toLowerCase().includes(searchValue)
    );
  }, [taskList, searchValue]);

  //로딩 중
  if (loading === "pending") return <Loading />;

  if (searchValue !== "") {
    return (
      <TaskList
        list={filteredList}
        searchHandler={searchHandler}
        handleReset={handleReset}
      />
    );
  }

  return (
    <TaskList
      list={taskList}
      searchHandler={searchHandler}
      handleReset={handleReset}
    />
  );
};

export default TaskListContainer;
