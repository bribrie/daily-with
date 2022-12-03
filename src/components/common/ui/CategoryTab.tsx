import { NavLink } from "react-router-dom";
import styles from "styles/common/ui/CategoryTab.module.scss";

export interface TabList {
  id: number;
  title: string;
  links: string;
}

interface TabProps {
  title: string;
  baseLink: string;
  categoryList: TabList[];
}

const CategoryTab = ({ title, baseLink, categoryList }: TabProps) => {
  return (
    <>
      <div className={styles.title}>{title}</div>
      <nav className={styles.nav}>
        {categoryList.map((list) => (
          <div key={list.id}>
            <NavLink
              to={`/${baseLink}/${list.links}`}
              className={({ isActive }) => (isActive ? styles.clicked : "")}
            >
              {list.title}
            </NavLink>
          </div>
        ))}
      </nav>
    </>
  );
};

export default CategoryTab;
