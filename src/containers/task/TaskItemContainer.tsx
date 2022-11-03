import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deleteTaskAsync,
  getTaskAsync,
  taskLoading,
} from "redux/task/taskSlice";
import { TaskListType } from "redux/types";
import { currentUserUid } from "redux/auth/authSlice";
import Loading from "components/layout/Loading";
import TaskItem from "components/task/TaskItem";

function TaskItemContainer({
  id,
  title,
  detail,
  day,
  time,
  specialDate,
}: Omit<TaskListType, "part">) {
  const { name } = useParams();
  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(taskLoading);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTaskAsync({ userUid, id })).unwrap();
      await dispatch(getTaskAsync({ userUid, name })).unwrap();
    } catch {
      alert("에러가 발생했습니다.");
    }
  };

  if (loading === "pending") return <Loading />;

  return (
    <TaskItem
      id={id}
      title={title}
      detail={detail}
      day={day}
      time={time}
      specialDate={specialDate}
      handleDelete={handleDelete}
    />
  );
}

export default TaskItemContainer;
