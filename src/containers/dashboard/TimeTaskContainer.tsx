import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  afternoonTask,
  getTaskAsync,
  morningTask,
  weekendTask,
} from "redux/task/taskSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { time, changeTime } from "redux/dashboard/timeTaskSlice";
import { currentUserUid } from "redux/auth/authSlice";
import TimeTask from "components/dashboard/TimeTask";

const TimeTaskContainer = () => {
  const presentTime = useSelector(time);
  const userUid = useAppSelector(currentUserUid);
  const dayMorningTask = useSelector(morningTask);
  const dayafternoonTask = useSelector(afternoonTask);
  const weekendAllTask = useSelector(weekendTask);
  const dispatch = useAppDispatch();
  const hour = new Date().getHours();
  const day = new Date().getDay();

  useEffect(() => {
    if (presentTime === hour) {
      return;
    }
    //오전일 때
    if (0 <= hour && hour <= 15 && dayMorningTask.length === 0) {
      dispatch(getTaskAsync({ userUid, name: "daymorning" }));
    }
    //오후일 때
    if (16 <= hour && dayafternoonTask.length === 0) {
      dispatch(getTaskAsync({ userUid, name: "dayafternoon" }));
    }
    //주말일 때
    if (day === 6 || day === 7) {
      if (presentTime === "weekend") {
        return;
      }
      if (weekendAllTask.length === 0) {
        dispatch(getTaskAsync({ userUid, name: "weekend" }));
      }
      dispatch(changeTime("weekend"));
      return;
    }
    dispatch(changeTime(hour));
  }, [
    hour,
    day,
    presentTime,
    dispatch,
    userUid,
    dayMorningTask.length,
    dayafternoonTask.length,
    weekendAllTask.length,
  ]);

  //오전일 때
  if (2 <= presentTime && presentTime <= 15) {
    return <TimeTask type="오전" taskList={dayMorningTask} />;
  }

  //주말일 때
  if (presentTime === "weekend") {
    return <TimeTask type="주말" taskList={weekendAllTask} />;
  }
  //오후일 때
  return <TimeTask type="오후" taskList={dayafternoonTask} />;
};

export default TimeTaskContainer;
