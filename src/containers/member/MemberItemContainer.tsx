import { useState } from "react";
import { MemeberListType } from "redux/types";
import MemberItem from "components/member/MemberItem";

const MemberItemContainer = ({
  id,
  role,
  image,
  name,
  contact,
  workDay,
  startDate,
  mainColor,
  introduction,
}: MemeberListType) => {
  const [detailIsOpen, setDetailIsOpenn] = useState(false);

  const handleOpenDatail = () => {
    setDetailIsOpenn(true);
  };

  const handleCloseDetail = () => {
    setDetailIsOpenn(false);
  };

  return (
    <MemberItem
      id={id}
      role={role}
      image={image}
      name={name}
      contact={contact}
      workDay={workDay}
      startDate={startDate}
      introduction={introduction}
      mainColor={mainColor}
      detailIsOpen={detailIsOpen}
      handleOpenDatail={handleOpenDatail}
      handleCloseDetail={handleCloseDetail}
    />
  );
};

export default MemberItemContainer;
