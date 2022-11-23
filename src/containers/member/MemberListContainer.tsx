import { useEffect, useMemo } from "react";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getMemberAsync,
  memberList,
  memberLoading,
} from "redux/member/memberSlice";
import { MemeberListType } from "redux/types";
import useSearch from "hooks/useSearch";
import Loading from "components/layout/Loading";
import MemberList from "components/member/MemberList";

const MemberListContainer = () => {
  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(memberLoading);
  const list = useAppSelector(memberList);
  const [searchValue, searchHandler, handleReset] = useSearch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (list.length === 0) {
      try {
        dispatch(getMemberAsync({ userUid })).unwrap();
      } catch {
        alert("직원 리스트를 가져오는 데 실패했습니다. 다시 시도해주세요.");
      }
    }
  }, [dispatch, userUid, list.length]);

  const filteredList = useMemo(() => {
    return list.filter((item: MemeberListType) =>
      item.name.toLowerCase().includes(searchValue)
    );
  }, [list, searchValue]);

  //Loading 중
  if (loading === "pending") return <Loading />;

  //검색어 유무
  if (searchValue === "") {
    return (
      <MemberList
        list={list}
        handleSearch={searchHandler}
        handleReset={handleReset}
      />
    );
  } else {
    return (
      <MemberList
        list={filteredList}
        handleSearch={searchHandler}
        handleReset={handleReset}
      />
    );
  }
};

export default MemberListContainer;
