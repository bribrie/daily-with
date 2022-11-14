import { FormEventHandler, MouseEvent, RefObject } from "react";
import { TaskListType } from "redux/types";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateContent from "components/layout/create/CreateContent";
import CreateInput from "components/layout/create/CreateInput";
import DayBox from "components/common/ui/DayBox";
import styles from "styles/task/TaskEdit.module.scss";

interface EditProps {
  data: TaskListType;
  partName: string;
  titleRef: RefObject<HTMLInputElement>;
  detailRef: RefObject<HTMLInputElement>;
  timeRef: RefObject<HTMLInputElement>;
  specialDateRef: RefObject<HTMLInputElement>;
  selectDay: string[];
  handleDaySelect: (e: MouseEvent) => void;
  handleDayReset: () => void;
  handleSubmit: FormEventHandler;
}

const TaskEdit = ({
  data,
  partName,
  titleRef,
  detailRef,
  timeRef,
  specialDateRef,
  selectDay,
  handleDaySelect,
  handleDayReset,
  handleSubmit,
}: EditProps) => {
  return (
    <>
      <CreateHeader title="업무 수정" linkAddress="/task" linkName="업무" />
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <section className={styles.contentWrapper}>
          <CreateContent idx="01" title="담당 직원">
            <CreateInput type="radio" labelId="오전" labelValue="오전">
              <input
                type="radio"
                name="part"
                id="오전"
                defaultChecked={partName === "오전"}
                disabled={partName !== "오전"}
                className={styles.labelInput}
              />
            </CreateInput>

            <CreateInput type="radio" labelId="오후" labelValue="오후">
              <input
                type="radio"
                name="part"
                id="오후"
                defaultChecked={partName === "오후"}
                disabled={partName !== "오후"}
                className={styles.labelInput}
              />
            </CreateInput>

            <CreateInput type="radio" labelId="주말" labelValue="주말">
              <input
                type="radio"
                name="part"
                id="주말"
                defaultChecked={partName === "주말"}
                disabled={partName !== "주말"}
                className={styles.labelInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="02" title="업무 제목">
            <CreateInput type="text">
              <input
                type="text"
                defaultValue={data.title}
                ref={titleRef}
                className={styles.textInput}
                required
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="03" title="상세 설명">
            <CreateInput type="text">
              <input
                type="text"
                defaultValue={data.detail}
                ref={detailRef}
                className={styles.textInput}
                required
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="04" title="요일 설정">
            <CreateInput type="text">
              <DayBox handleDaySelect={handleDaySelect} />
              <div className={styles.selectWrapper}>
                <div className={styles.dayWrapper}>
                  {selectDay.map((el, idx) => (
                    <div key={idx}>{`${
                      idx === selectDay.length - 1 ? `${el}` : `${el} , `
                    }`}</div>
                  ))}
                </div>
                <button className={styles.button} onClick={handleDayReset}>
                  clear
                </button>
              </div>
            </CreateInput>
          </CreateContent>

          <CreateContent idx="05" title="시간 설정">
            <CreateInput type="text">
              <input
                type="text"
                defaultValue={data.time}
                ref={timeRef}
                className={styles.textInput}
                required
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="06" title="특정 날짜 선택">
            <div className={styles.specialDateInfo}>
              {selectDay.length === 0
                ? `※ 특정 날짜로 설정하고 싶을 시, 달력에서 날짜를
              선택해주세요.`
                : `※ 요일 설정과 날짜 설정 중 하나만 선택해주세요.`}
            </div>

            <CreateInput type="date">
              <input
                type="date"
                defaultValue={data.specialDate || ""}
                ref={specialDateRef}
                className={styles.textInput}
                disabled={selectDay.length !== 0 ? true : false}
              />
            </CreateInput>
          </CreateContent>
        </section>
        <div className={styles.buttonWrapper}>
          <button>수정 완료</button>
        </div>
      </form>
    </>
  );
};

export default TaskEdit;
