import { MemeberListType } from "redux/types";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { deleteMemberAsync, getMemberAsync } from "redux/member/memberSlice";
import { currentUserUid } from "redux/auth/authSlice";
import MemberItem from "components/member/MemberItem";

const MemberItemContainer = ({
  id,
  role,
  image,
  name,
  contact,
  workDay,
}: MemeberListType) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);

  const handleDelete = async () => {
    try {
      await dispatch(deleteMemberAsync({ userUid, id, image, name })).unwrap();
      await dispatch(getMemberAsync({ userUid })).unwrap();
    } catch (err: any) {
      if (err.includes("does not exist")) {
        alert("삭제하려는 데이터가 존재하지 않습니다.");
      } else {
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <MemberItem
      id={id}
      role={role}
      image={image}
      name={name}
      contact={contact}
      workDay={workDay}
      handleDelete={handleDelete}
    />
  );
};

export default MemberItemContainer;
