import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import TaskTab from "./TaskTab";
import styles from "styles/task/TaskLayout.module.scss";

const TaskLayout = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (!name) {
      return navigate("/task/daymorning");
    }
  }, [navigate, name]);

  return (
    <div className={styles.container}>
      <TaskTab />
      <Outlet />
    </div>
  );
};

export default TaskLayout;
