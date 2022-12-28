import { FormEventHandler, RefObject } from "react";
import { NoticeListType } from "redux/types";
import { THIS_MONTH } from "utilites/Date";
import { ReactComponent as Delete } from "assets/images/Delete.svg";
import styles from "styles/dashboard/MonthlyNotice.module.scss";

interface NoticeFormProps {
  noticeList: NoticeListType[];
  inputRef: RefObject<HTMLInputElement>;
  handleSumbit: FormEventHandler;
  handleDelete: (id: string) => void;
}

const MonthlyNoticeForm = ({
  noticeList,
  inputRef,
  handleSumbit,
  handleDelete,
}: NoticeFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{THIS_MONTH}월 공지</div>
      <ul>
        {noticeList.map((item) => (
          <li className={styles.item} key={item.id}>
            <div>{item.content}</div>
            <div
              onClick={() => handleDelete(item.id)}
              className={styles.deleteBtn}
            >
              <Delete />
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSumbit} className={styles.formWrapper}>
        <div>
          <input type="text" ref={inputRef} />
          <button>등록</button>
        </div>
      </form>
    </div>
  );
};

export default MonthlyNoticeForm;
