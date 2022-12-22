import { ChangeEventHandler, FormEventHandler } from "react";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateContent from "components/layout/create/CreateContent";
import CreateInput from "components/layout/create/CreateInput";
import FinishButton from "components/common/ui/FinishButton";
import styles from "styles/price/PriceForm.module.scss";

interface FormProps {
  type: string;
  period: string;
  title: string;
  price: string;
  delay: string;
  event: string;
  handleChange: ChangeEventHandler;
  handlePrice: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}

const PriceEdit = ({
  type,
  period,
  title,
  price,
  delay,
  event,
  handleChange,
  handlePrice,
  handleSubmit,
}: FormProps) => {
  return (
    <>
      <CreateHeader title="이용권 수정" linkAddress="/price" linkName="가격" />
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <section className={styles.contentWrapper}>
          <CreateContent idx="01">
            <div className={styles.eventTitle}>
              이벤트 이용권 확인
              <input
                type="checkbox"
                name="event"
                id="event"
                className={styles.checkbox}
                defaultChecked={event === "true"}
                disabled
              />
            </div>
            <div className={styles.checkInfo}>
              &#8251; 이벤트 이용권일시 체크버튼을 눌러주세요
            </div>
          </CreateContent>

          <CreateContent idx="02" title="이용권 종목">
            <CreateInput type="radio" labelId="헬스" labelValue="헬스">
              <input
                type="radio"
                id="헬스"
                value="헬스"
                name="type"
                defaultChecked={type === "헬스"}
                onChange={handleChange}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="PT" labelValue="PT">
              <input
                type="radio"
                id="PT"
                value="PT"
                name="type"
                defaultChecked={type === "PT"}
                onChange={handleChange}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="필라테스" labelValue="필라테스">
              <input
                type="radio"
                id="필라테스"
                name="type"
                value="필라테스"
                defaultChecked={type === "필라테스"}
                onChange={handleChange}
                className={styles.labelInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="03" title="이용권 종류">
            <CreateInput type="radio" labelId="기간제" labelValue="기간제">
              <input
                type="radio"
                id="기간제"
                value="기간제"
                name="period"
                defaultChecked={period === "기간제"}
                onChange={handleChange}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="횟수제" labelValue="횟수제">
              <input
                type="radio"
                id="횟수제"
                value="횟수제"
                name="period"
                defaultChecked={period === "횟수제"}
                onChange={handleChange}
                className={styles.labelInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="04" title="이용권 이름">
            <CreateInput type="text">
              <input
                type="text"
                name="title"
                value={title}
                required
                onChange={handleChange}
                className={styles.textInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="05" title="이용권 금액">
            <CreateInput type="text" unit="원">
              <input
                type="text"
                name="title"
                value={price}
                required
                onChange={handlePrice}
                className={styles.unitInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="06" title="연기 가능 일수">
            <CreateInput type="text" unit="일">
              <input
                type="text"
                name="delay"
                value={delay}
                required
                onChange={handleChange}
                className={styles.unitInput}
              />
            </CreateInput>
          </CreateContent>
        </section>
        <FinishButton content="수정 완료" />
      </form>
    </>
  );
};

export default PriceEdit;
