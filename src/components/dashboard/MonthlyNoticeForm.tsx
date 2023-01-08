import { FormEventHandler, MouseEventHandler, RefObject } from "react";
import { NoticeListType } from "redux/types";
import { THIS_MONTH } from "utilites/Date";
import { ReactComponent as Delete } from "assets/images/Delete.svg";
import styles from "styles/dashboard/MonthlyForm.module.scss";

interface NoticeFormProps {
  noticeList: NoticeListType[];
  inputRef: RefObject<HTMLInputElement>;
  handleSumbit: FormEventHandler;
  handleDelete: (id: string) => void;
  handleCancel: MouseEventHandler;
}

const MonthlyNoticeForm = ({
  noticeList,
  inputRef,
  handleSumbit,
  handleDelete,
  handleCancel,
}: NoticeFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{THIS_MONTH}월 공지</div>
      <ul className={styles.list}>
        {noticeList.map((item) => (
          <li className={styles.itemWrapper} key={item.id}>
            <div>{item.content}</div>
            <Delete
              onClick={() => handleDelete(item.id)}
              className={styles.deleteBtn}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSumbit} className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <input type="text" ref={inputRef} autoFocus />
          <button>등록</button>
        </div>
        <div onClick={handleCancel} className={styles.cancelBtn}>
          취소
        </div>
      </form>
    </div>
  );
};

export default MonthlyNoticeForm;
