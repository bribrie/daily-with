import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import CreateHeader from "components/layout/CreateHeader";
import Input from "components/layout/Input";
import styles from "styles/price/PriceForm.module.scss";
import CreateContent from "components/layout/CreateContent";

interface FormProps {
  handleSave?: MouseEventHandler;
  handleChange: ChangeEventHandler;
  handlePrice: ChangeEventHandler;
  handleCheckEvent: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  price: string;
}

const PriceForm = ({
  handleChange,
  handlePrice,
  handleCheckEvent,
  handleSubmit,
  price,
}: FormProps) => {
  return (
    <>
      <CreateHeader title="이용권 등록" linkAddress="/price" linkName="가격" />
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <section className={styles.contentWrapper}>
          <CreateContent idx="01">
            <div className={styles.eventTitle}>
              이벤트 이용권 확인
              <input
                type="checkbox"
                name="event"
                id="event"
                className={styles.checkbox}
                onChange={handleCheckEvent}
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
              defaultChecked
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="type"
              value="PT"
              id="PT"
              label="PT"
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="type"
              value="필라테스"
              id="필라테스"
              label="필라테스"
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
              defaultChecked
              onChange={handleChange}
            />
            <Input
              type="radio"
              name="period"
              value="횟수제"
              id="횟수제"
              label="횟수제"
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="04" title="이용권 이름">
            <Input
              type="text"
              name="title"
              id="title"
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
              unit="일"
              required
              onChange={handleChange}
            />
          </CreateContent>

          <CreateContent idx="07" title="색상 선택">
            <div></div>
          </CreateContent>
        </section>
        <div className={styles.buttonWrapper}>
          <button>등록 완료</button>
        </div>
      </form>
    </>
  );
};

export default PriceForm;
