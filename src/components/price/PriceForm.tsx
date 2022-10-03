import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import CreateHeader from "components/layout/CreateHeader";
import Input from "components/layout/Input";
import styles from "styles/price/PriceForm.module.scss";

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
          <div className={styles.content}>
            <div className={styles.idx}>01</div>
            <div className={styles.info}>
              <div className={styles.title}>
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
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>02</div>
            <div className={styles.info}>
              <div className={styles.title}>이용권 종목</div>
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
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>03</div>
            <div className={styles.info}>
              <div className={styles.title}>이용권 종류</div>
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
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>04</div>
            <div className={styles.info}>
              <div className={styles.title}>이용권 이름</div>
              <Input
                type="text"
                name="title"
                id="title"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>05</div>
            <div className={styles.info}>
              <div className={styles.title}>이용권 금액</div>
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
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>06</div>
            <div className={styles.info}>
              <div className={styles.title}>연기 가능 일수</div>
              <Input
                type="text"
                name="delay"
                id="delay"
                unit="일"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.idx}>07</div>
            <div className={styles.info}>
              <div className={styles.title}>색상 선택</div>
            </div>
          </div>
        </section>
        <div className={styles.buttonWrapper}>
          <button>등록 완료</button>
        </div>
      </form>
    </>
  );
};

export default PriceForm;
