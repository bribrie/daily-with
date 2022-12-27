import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CategoryTab, { TabList } from "components/common/ui/CategoryTab";
import styles from "styles/company/CompanyLayout.module.scss";

const CompanyLayout = () => {
  const companyList: TabList[] = [
    { id: 1, title: "지점 정보", links: "information" },
    { id: 3, title: "정보 수정", links: "edit" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.slice(8).length;

  useEffect(() => {
    //"/company" or "/company/"로 들어올 때는 바로 today로 보내주기
    if (pathname === 0 || pathname === 1) {
      navigate("/company/information");
    }
  }, [navigate, pathname]);

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.innerContainer}>
        <CategoryTab
          title="회사 정보"
          categoryList={companyList}
          baseLink="company"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyLayout;
