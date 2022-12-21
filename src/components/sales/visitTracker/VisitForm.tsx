import { FormEventHandler, RefObject } from "react";
import { VISIT_DATE } from "utilites/Date";
import { VisitFormProps } from "containers/sales/visitTracker/VisitFormContainer";
import VisitHeader from "./VisitHeader";
import styles from "styles/sales/visitTracker/VisitForm.module.scss";
import TypeSelectBox from "components/common/ui/TypeSelectBox";

interface Props extends Pick<VisitFormProps, "editItem"> {
  dateRef: RefObject<HTMLInputElement>;
  typeRef: RefObject<HTMLSelectElement>;
  offlineRef: RefObject<HTMLInputElement>;
  onlineRef: RefObject<HTMLInputElement>;
  friendRef: RefObject<HTMLInputElement>;
  telInRef: RefObject<HTMLInputElement>;
  naverInRef: RefObject<HTMLInputElement>;
  kakaoInRef: RefObject<HTMLInputElement>;
  totalVisitRef: RefObject<HTMLInputElement>;
  registerVisitRef: RefObject<HTMLInputElement>;
  handleAddVisitItem: FormEventHandler;
  handleEditVisitItem: FormEventHandler;
}

const VisitForm = ({
  dateRef,
  typeRef,
  offlineRef,
  onlineRef,
  friendRef,
  telInRef,
  naverInRef,
  kakaoInRef,
  totalVisitRef,
  registerVisitRef,
  editItem,
  handleAddVisitItem,
  handleEditVisitItem,
}: Props) => {
  const formData = [
    {
      name: "date",
      type: "text",
      ref: dateRef,
      defaultValue: editItem ? editItem.date : VISIT_DATE,
    },
    {
      name: "type",
      type: "text",
      ref: typeRef,
      defaultValue: editItem ? (editItem.type as string) : null,
    },
    {
      name: "offline",
      type: "number",
      ref: offlineRef,
      defaultValue: editItem ? editItem.offline : null,
    },
    {
      name: "online",
      type: "number",
      ref: onlineRef,
      defaultValue: editItem ? editItem.online : null,
    },
    {
      name: "friend",
      type: "number",
      ref: friendRef,
      defaultValue: editItem ? editItem.friend : null,
    },
    {
      name: "telIn",
      type: "number",
      ref: telInRef,
      defaultValue: editItem ? editItem.telIn : null,
    },
    {
      name: "naverIn",
      type: "number",
      ref: naverInRef,
      defaultValue: editItem ? editItem.naverIn : null,
    },
    {
      name: "kakaoIn",
      type: "number",
      ref: kakaoInRef,
      defaultValue: editItem ? editItem.kakaoIn : null,
    },
    {
      name: "totalVisit",
      type: "number",
      ref: totalVisitRef,
      defaultValue: editItem ? editItem.totalVisit : null,
    },
    {
      name: "registerVisit",
      type: "number",
      ref: registerVisitRef,
      defaultValue: editItem ? editItem.registerVisit : null,
    },
  ];

  return (
    <>
      {editItem && <VisitHeader />}
      <form
        className={styles.listWrapper}
        onSubmit={editItem ? handleEditVisitItem : handleAddVisitItem}
      >
        {formData.map((data) => (
          <div className={styles[data.name]} key={data.name}>
            {data.name === "type" ? (
              <TypeSelectBox
                typeRef={data.ref as RefObject<HTMLSelectElement>}
                typeDefaultValue={data.defaultValue as string | null}
              />
            ) : (
              <input
                type={data.type}
                ref={data.ref as RefObject<HTMLInputElement>}
                defaultValue={data.defaultValue ? data.defaultValue : 0}
                min={data.type === "number" ? 0 : ""}
                required
              />
            )}
          </div>
        ))}

        {editItem ? null : (
          <div className={styles.buttonWrapper}>
            <button>등록</button>
          </div>
        )}
      </form>
      {editItem ? (
        <div className={styles.editButtonWrapper}>
          <button type="submit" onClick={handleEditVisitItem}>
            수정 완료
          </button>
        </div>
      ) : null}
    </>
  );
};

export default VisitForm;
