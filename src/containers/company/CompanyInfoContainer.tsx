import { useEffect } from "react";
import {
  companyInfo,
  companyLinkInfo,
  companyTimeInfo,
  getCompanyAsync,
} from "redux/company/companySlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { currentUserUid } from "redux/auth/authSlice";
import CompanyInfo from "components/company/CompanyInfo";

const CompanyInfoContainer = () => {
  const companyInformation = useAppSelector(companyInfo);
  const timeInformation = useAppSelector(companyTimeInfo);
  const linkInformation = useAppSelector(companyLinkInfo);
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);

  useEffect(() => {
    if (companyInformation.length === 0) {
      dispatch(getCompanyAsync({ userUid }));
    }
  }, [companyInformation.length, dispatch, userUid]);

  return (
    <CompanyInfo
      basicInfo={companyInformation}
      timeInfo={timeInformation}
      linkInfo={linkInformation}
    />
  );
};

export default CompanyInfoContainer;
