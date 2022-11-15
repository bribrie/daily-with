import { ChangeEventHandler, FormEventHandler } from "react";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateContent from "components/layout/create/CreateContent";
import Input from "components/layout/Input";
import FinishButton from "components/common/ui/FinishButton";
import styles from "styles/price/PriceEdit.module.scss";

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
            <Input
              type="radio"
              name="type"
              value="헬스"
              id="헬스"
              label="헬스"
              defaultChecked={type === "헬스"}
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="type"
              value="PT"
              id="PT"
              label="PT"
              defaultChecked={type === "PT"}
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="type"
              value="필라테스"
              id="필라테스"
              label="필라테스"
              defaultChecked={type === "필라테스"}
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="03" title="이용권 종류">
            <Input
              type="radio"
              name="period"
              value="기간제"
              id="기간제"
              label="기간제"
              defaultChecked={period === "기간제"}
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="period"
              value="횟수제"
              id="횟수제"
              label="횟수제"
              defaultChecked={period === "횟수제"}
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="04" title="이용권 이름">
            <Input
              type="text"
              name="title"
              id="title"
              value={title}
              required
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="05" title="이용권 금액">
            <Input
              type="text"
              name="price"
              value={price}
              id="price"
              placeholder="0"
              unit="원"
              required
              onChange={handlePrice}
            />
          </CreateContent>

          <CreateContent idx="06" title="연기 가능 일수">
            <Input
              type="text"
              name="delay"
              id="delay"
              value={delay}
              unit="일"
              required
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="07" title="색상 선택">
            <div></div>
          </CreateContent>
        </section>
        <FinishButton content="수정 완료" />
      </form>
    </>
  );
};

export default PriceEdit;
