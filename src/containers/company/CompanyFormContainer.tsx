import { FormEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  currentUser,
  currentUserUid,
  updateUserNameAsync,
} from "redux/auth/authSlice";
import {
  addCompanyAsync,
  addLink,
  addLinkList,
  companyInfo,
  companyLinkInfo,
  companyLoading,
  companyTimeInfo,
  deleteLink,
  editCompanyAsync,
  getCompanyAsync,
} from "redux/company/companySlice";
import { useNavigate } from "react-router-dom";
import { AddCompanyReq } from "redux/types";
import useItemCount from "hooks/useItemCount";
import useInput from "hooks/useInput";
import Loading from "components/layout/Loading";
import CompanyForm from "components/company/CompanyForm";

const CompanyFormContainer = () => {
  const currentCenterName = useAppSelector(currentUser);
  const basicInfo = useAppSelector(companyInfo);
  const timeInfo = useAppSelector(companyTimeInfo);
  const linkInfo = useAppSelector(companyLinkInfo);
  const addedLinkList = useAppSelector(addLinkList);
  const centerNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [itemCount, addItemCount, resetItemCount] =
    useItemCount("등록 버튼을 먼저");
  const [{ name, url }, handleLinkChange, handleLinkReset] = useInput({
    name: "",
    url: "",
  });
  const [
    {
      weekdayOpen,
      weekdayClose,
      weekendOpen,
      weekendClose,
      holidayTimeOpen,
      holidayTimeClose,
      holidayDate,
    },
    handleTimeChange,
  ] = useInput({
    weekdayOpen: `${timeInfo.length !== 0 ? timeInfo[0].weekdayOpen : ""}`,
    weekdayClose: `${timeInfo.length !== 0 ? timeInfo[0].weekdayClose : ""}`,
    weekendOpen: `${timeInfo.length !== 0 ? timeInfo[0].weekendOpen : ""}`,
    weekendClose: `${timeInfo.length !== 0 ? timeInfo[0].weekendClose : ""}`,
    holidayTimeOpen: `${
      timeInfo.length !== 0 ? timeInfo[0].holidayTimeOpen : ""
    }`,
    holidayTimeClose: `${
      timeInfo.length !== 0 ? timeInfo[0].holidayTimeClose : ""
    }`,
    holidayDate: `${timeInfo.length !== 0 ? timeInfo[0].holidayDate : ""}`,
  });

  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(companyLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (linkInfo.length !== 0) {
      linkInfo.map((el) => dispatch(addLink(el)));
    }
    return () => {
      linkInfo.map((el) => dispatch(deleteLink(el.orderNumber)));
    };
  }, [dispatch, linkInfo]);

  const handleAddLinkList = () => {
    //빈 칸인지 확인
    if (name === "" || url === "") {
      alert("사이트 이름과 url을 모두 입력해주세요.");
      return;
    }
    //추가 후 input과 count 초기화
    dispatch(addLink({ name, url, orderNumber: addedLinkList.length + 1 }));
    handleLinkReset();
    resetItemCount();
  };

  const handleDeletLinkList = (orderNumber: number) => {
    dispatch(deleteLink(orderNumber));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const changedCenterName = centerNameRef.current?.value as string;
      const timeData = [
        {
          weekdayOpen,
          weekdayClose,
          weekendOpen,
          weekendClose,
          holidayTimeOpen,
          holidayTimeClose,
          holidayDate,
        },
      ];
      const linkData =
        name === "" || url === "" ? [] : [{ name, url, orderNumber: 1 }];
      let addData: AddCompanyReq = {
        userUid,
        phoneNumber: phoneNumberRef.current?.value as string,
        location: locationRef.current?.value as string,
        timeInfo: timeData,
        linkInfo: addedLinkList.length === 0 ? linkData : addedLinkList,
      };

      //처음 등록 시
      if (basicInfo.length === 0) {
        if (currentCenterName !== changedCenterName) {
          await dispatch(
            updateUserNameAsync({ userUid, centerName: changedCenterName })
          ).unwrap();
        }
        await dispatch(addCompanyAsync(addData)).unwrap();
        await dispatch(getCompanyAsync({ userUid })).unwrap();
        navigate("/company/information");
        return;
      }

      //수정 시
      if (currentCenterName !== changedCenterName) {
        await dispatch(
          updateUserNameAsync({ userUid, centerName: changedCenterName })
        ).unwrap();
      }
      await dispatch(editCompanyAsync(addData)).unwrap();
      await dispatch(getCompanyAsync({ userUid })).unwrap();
      navigate("/company/information");
    } catch {
      alert("회사 정보 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const timeData = [
    { title: "평일", name: "weekday", open: weekdayOpen, close: weekdayClose },
    { title: "주말", name: "weekend", open: weekendOpen, close: weekendClose },
    {
      title: "공휴일",
      name: "holidayTime",
      open: holidayTimeOpen,
      close: holidayTimeClose,
    },
    { title: "휴일", name: "holidayDate", date: holidayDate },
  ];

  if (loading === "pending") return <Loading type="sales" />;

  return (
    <CompanyForm
      currentCenterName={currentCenterName as string}
      centerNameRef={centerNameRef}
      phoneNumberRef={phoneNumberRef}
      locationRef={locationRef}
      handleTimeChange={handleTimeChange}
      handleLinkChange={handleLinkChange}
      handleSubmit={handleSubmit}
      addedLinkList={addedLinkList}
      handleAddLinkList={handleAddLinkList}
      siteName={name}
      siteUrl={url}
      basicInfo={basicInfo}
      timeData={timeData}
      addItemCount={addItemCount}
      handleDeletLinkList={handleDeletLinkList}
    />
  );
};

export default CompanyFormContainer;
