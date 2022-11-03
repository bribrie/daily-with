import { lists } from "components/task/TaskTab";
import { FormEvent, MouseEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addTaskAsync, getTaskAsync } from "redux/task/taskSlice";
import { AddTaskReq } from "redux/types";
import TaskForm from "components/task/TaskForm";

const TaskFormContainer = () => {
  const { name } = useParams();
  const userUid = useAppSelector(currentUserUid);
  const partName = lists.filter((el) => el.links === name)[0].title;
  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const specialDateRef = useRef<HTMLInputElement>(null);
  const [selectDay, setSelectDay] = useState<string[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDaySelect = (e: MouseEvent) => {
    const value = e.currentTarget.textContent as string;
    const idx = selectDay.findIndex((el) => el === value);

    if (idx !== -1) {
      setSelectDay((prev) => prev.filter((e, i) => i !== idx));
    } else {
      setSelectDay((prev) => [...prev, value]);
    }
  };

  const handleDayReset = () => {
    setSelectDay([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const tasks: AddTaskReq = {
        userUid,
        part: name,
        title: titleRef.current?.value as string,
        detail: detailRef.current?.value as string,
        day: selectDay,
        time: timeRef.current?.value as string,
        specialDate: specialDateRef
          ? (specialDateRef.current?.value as string)
          : null,
      };
      if (tasks.day.length === 0) {
        alert("요일을 설정해주세요.");
        return;
      }
      if (tasks.title.length < 2 && tasks.detail.length < 2) {
        alert("2글자 이상 입력해주세요.");
        return;
      } else {
        //AddAsync
        await dispatch(addTaskAsync(tasks)).unwrap();
        await dispatch(getTaskAsync({ userUid, name })).unwrap();
        navigate(`/task/${name}`);
      }
    } catch {
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <TaskForm
      part={name || ""}
      partName={partName}
      titleRef={titleRef}
      detailRef={detailRef}
      timeRef={timeRef}
      specialDateRef={specialDateRef}
      selectDay={selectDay}
      handleDaySelect={handleDaySelect}
      handleDayReset={handleDayReset}
      handleSubmit={handleSubmit}
    />
  );
};

export default TaskFormContainer;
