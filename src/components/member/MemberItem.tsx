import { CHECK_IMAGE_WORD } from "redux/member/memberSlice";
import { MemeberListType } from "redux/types";
import UserIcon from "assets/images/UserCircle.png";
import MemberDetail from "components/member/MemberDetail";
import styles from "styles/member/MemberItem.module.scss";

interface MemeberItemProps extends MemeberListType {
  handleOpenDatail: () => void;
  handleCloseDetail: () => void;
  roleType?: string;
  detailIsOpen: boolean;
}

const MemberItem = ({
  id,
  name,
  role,
  image,
  workDay,
  contact,
  introduction,
  startDate,
  mainColor,
  detailIsOpen,
  handleCloseDetail,
  handleOpenDatail,
}: MemeberItemProps) => {
  return (
    <>
      {detailIsOpen ? (
        <MemberDetail
          id={id}
          name={name}
          role={role}
          image={image}
          workDay={workDay}
          contact={contact}
          introduction={introduction}
          startDate={startDate}
          handleCloseDetail={handleCloseDetail}
        />
      ) : null}
      <div
        className={`${styles.itemWrapper} ${styles[`${mainColor}`]}`}
        onClick={handleOpenDatail}
      >
        <div className={styles.imageWrapper}>
          {image === CHECK_IMAGE_WORD ? (
            <img src={UserIcon} alt="profile icon" className={styles.icon} />
          ) : (
            <img
              src={image as string}
              alt="profile pic"
              className={styles.picture}
            />
          )}
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.name}>{name}</div>
          <div className={styles.role}>{role}</div>
        </div>
      </div>
    </>
  );
};

export default MemberItem;
