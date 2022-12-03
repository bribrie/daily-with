import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CategoryTab, { TabList } from "components/common/ui/CategoryTab";
import styles from "styles/sales/SalesLayout.module.scss";

const SalesLayout = () => {
  const categoryList: TabList[] = [
    { id: 1, title: "오늘 매출", links: "today" },
    { id: 2, title: "전체 매출", links: "all" },
    {
      id: 3,
      title: "목표 매출",
      links: "monthly-target",
    },
    {
      id: 4,
      title: "방문 경로",
      links: "visit-tracker",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.slice(6).length;

  useEffect(() => {
    //"/sales" or "/sales/"로 들어올 때는 바로 today로 보내주기
    if (pathname === 0 || pathname === 1) {
      navigate("/sales/today");
    }
  }, [navigate, pathname]);

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.innerContainer}>
        <CategoryTab
          title="매출"
          baseLink="sales"
          categoryList={categoryList}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default SalesLayout;
