import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Link } from "react-router-dom";
import {
  CHECK_IMAGE_WORD,
  deleteMemberAsync,
  getMemberAsync,
  memberLoading,
} from "redux/member/memberSlice";
import { MemeberListType } from "redux/types";
import { currentUserUid } from "redux/auth/authSlice";
import UserIcon from "assets/images/UserCircle.png";
import Portal from "components/common/modal/Portal";
import styles from "styles/member/MemberDetail.module.scss";
import Loading from "components/layout/Loading";

export interface DetailProps extends Omit<MemeberListType, "mainColor"> {
  handleCloseDetail: () => void;
}

const MemberDetail = ({
  id,
  name,
  role,
  image,
  workDay,
  contact,
  startDate,
  introduction,
  handleCloseDetail,
}: DetailProps) => {
  const dispatch = useAppDispatch();
  const userUid = useAppSelector(currentUserUid);
  const loading = useAppSelector(memberLoading);

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

  if (loading === "pending") return <Loading />;

  const contentList = [
    { title: "직책", content: role },
    { title: "연락처", content: contact },
    { title: "근무 요일", content: workDay },
    { title: "강사 소개", content: introduction },
    { title: "입사일", content: startDate },
  ];

  return (
    <Portal>
      <div className={styles.overlay}>
        <div className={styles.backdrop} onClick={handleCloseDetail}>
          <div className={styles.container}>
            <div className={styles.profileWrapper}>
              <div className={styles.imageWrapper}>
                {image === CHECK_IMAGE_WORD ? (
                  <img
                    src={UserIcon}
                    alt="profile icon"
                    className={styles.icon}
                  />
                ) : (
                  <img
                    src={image as string}
                    alt="profile pic"
                    className={styles.picture}
                  />
                )}
              </div>
              <div className={styles.nameWrapper}>
                <div className={styles.title}>이름</div>
                <div className={styles.name}>{name}</div>
              </div>
            </div>

            <div className={styles.itemContainer}>
              <div className={styles.contentWrapper}>
                {contentList.map((el, idx) => (
                  <div className={styles.contentItemWrapper} key={idx}>
                    <div className={styles.title}>{el.title}</div>
                    <div>{el.content || "등록된 소개가 없습니다."}</div>
                  </div>
                ))}
              </div>
              <div className={styles.buttonWrapper}>
                <Link to={`${id}`}>
                  <button>수정</button>
                </Link>
                <button onClick={handleDelete}>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default MemberDetail;
