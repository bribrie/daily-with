import { Link } from "react-router-dom";
import { CHECK_IMAGE_WORD } from "redux/member/memberSlice";
import { MouseEventHandler } from "react";
import Profile from "assets/images/Profile.svg";
import styles from "styles/member/MemberItem.module.scss";

interface ItemProps {
  id: string;
  name: string;
  role: string;
  image: string | undefined | File;
  workDay: string;
  contact: string;
  handleDelete: MouseEventHandler;
}

const MemberItem = ({
  id,
  name,
  role,
  image,
  workDay,
  contact,
  handleDelete,
}: ItemProps) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.role}>{role}</div>
        <div className={styles.profileImg}>
          {image === CHECK_IMAGE_WORD ? (
            <img
              src={Profile}
              alt="profile icon"
              className={styles.imageIcon}
            />
          ) : (
            <img
              src={image as string}
              alt="profile pic"
              className={styles.imageSrc}
            />
          )}
        </div>
        <div className={styles.introduction}>
          <div className={styles.name}>{name}</div>
          <div className={styles.contact}>{contact}</div>
          <div className={styles.workDay}>근무일 : {workDay}</div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Link to={`${id}`}>
          <div className={styles.updateBtn}>수정</div>
        </Link>
        <div className={styles.deleteBtn} onClick={handleDelete}>
          삭제
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
