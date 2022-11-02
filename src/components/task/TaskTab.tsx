import { NavLink } from "react-router-dom";
import styles from "styles/task/TaskTab.module.scss";

export const lists = [
  { id: 1, title: "오전", links: "daymorning" },
  {
    id: 2,
    title: "오후",
    links: "dayafternoon",
  },
  {
    id: 3,
    title: "주말",
    links: "weekend",
  },
];

function TaskTab() {
  return (
    <nav className={styles.wrapper}>
      {lists.map((list) => (
        <NavLink
          key={list.id}
          to={`/task/${list.links}`}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.clicked}` : styles.link
          }
        >
          {list.title}
        </NavLink>
      ))}
    </nav>
  );
}

export default TaskTab;
