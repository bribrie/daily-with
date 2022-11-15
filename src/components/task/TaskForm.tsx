import { RefObject, FormEventHandler, MouseEvent } from "react";
import CreateContent from "components/layout/create/CreateContent";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateInput from "components/layout/create/CreateInput";
import DayBox from "components/common/ui/DayBox";
import FinishButton from "components/common/ui/FinishButton";
import styles from "styles/task/TaskForm.module.scss";

interface FormType {
  part: string;
  partName?: string;
  titleRef: RefObject<HTMLInputElement>;
  detailRef: RefObject<HTMLInputElement>;
  timeRef: RefObject<HTMLInputElement>;
  specialDateRef: RefObject<HTMLInputElement>;
  selectDay: string[];
  handleDaySelect: (e: MouseEvent) => void;
  handleDayReset: () => void;
  handleSubmit: FormEventHandler;
}

const TaskForm = ({
  part,
  partName,
  titleRef,
  detailRef,
  timeRef,
  specialDateRef,
  selectDay,
  handleDaySelect,
  handleDayReset,
  handleSubmit,
}: FormType) => {
  return (
    <>
      <CreateHeader
        title="업무 등록"
        linkAddress={`/task/${part}`}
        linkName="업무"
      />
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <section className={styles.contentWrapper}>
          <CreateContent idx="01" title="담당 직원">
            <CreateInput type="radio" labelId="오전" labelValue="오전">
              <input
                type="radio"
                id="오전"
                defaultChecked={partName === "오전"}
                disabled={partName !== "오전"}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="오후" labelValue="오후">
              <input
                type="radio"
                id="오후"
                defaultChecked={partName === "오후"}
                disabled={partName !== "오후"}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="주말" labelValue="주말">
              <input
                type="radio"
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
                ref={titleRef}
                id="title"
                required
                className={styles.textInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="03" title="상세 설명">
            <CreateInput type="text">
              <input
                type="text"
                ref={detailRef}
                id="detail"
                required
                className={styles.textInput}
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

          <CreateContent idx="05" title="특정 날짜 선택">
            <div className={styles.specialDateInfo}>
              {selectDay.length === 0
                ? `※ 특정 날짜로 설정하고 싶을 시, 달력에서 날짜를
              선택해주세요.`
                : `※ 요일 설정과 날짜 설정 중 하나만 선택해주세요.`}
            </div>

            <CreateInput type="date">
              <input
                type="date"
                ref={specialDateRef}
                className={styles.textInput}
                disabled={selectDay.length !== 0 ? true : false}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="06" title="시간 설정">
            <CreateInput type="text">
              <input
                type="text"
                ref={timeRef}
                className={styles.textInput}
                required
              />
            </CreateInput>
          </CreateContent>
        </section>
        <FinishButton content="등록 완료" />
      </form>
    </>
  );
};

export default TaskForm;
