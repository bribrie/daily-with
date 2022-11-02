import { Outlet } from "react-router-dom";
import TaskTab from "./TaskTab";
import styles from "styles/task/TaskLayout.module.scss";

const TaskLayout = () => {
  return (
    <section className={styles.container}>
      <TaskTab />
      <Outlet />
    </section>
  );
};

export default TaskLayout;
