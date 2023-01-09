import { ChangeEventHandler, FormEventHandler, RefObject } from "react";
import { MemeberListType } from "redux/types";
import { CHECK_IMAGE_WORD } from "redux/member/memberSlice";
import { ColorType } from "containers/member/MemberFormContainer";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateContent from "components/layout/create/CreateContent";
import CreateInput from "components/layout/create/CreateInput";
import FinishButton from "components/common/ui/FinishButton";
import UserIcon from "assets/images/UserCircle.webp";
import styles from "styles/member/MemberForm.module.scss";

interface EditProps {
  data: MemeberListType;
  nameRef: RefObject<HTMLInputElement>;
  contactRef: RefObject<HTMLInputElement>;
  startDateRef: RefObject<HTMLInputElement>;
  workDay: string;
  introductionRef: RefObject<HTMLInputElement>;
  mainColor: ColorType[];
  handleChange: ChangeEventHandler;
  handleChangeColor: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}

const MemberEdit = ({
  data,
  nameRef,
  contactRef,
  startDateRef,
  workDay,
  introductionRef,
  mainColor,
  handleChange,
  handleChangeColor,
  handleSubmit,
}: EditProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <CreateHeader title="직원 등록" linkAddress="/member" linkName="직원">
        <div className={styles.infoWrapper}>
          <div className={styles.name}>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              defaultValue={data.name}
              ref={nameRef}
              required
            />
          </div>
          <div className={styles.role}>
            <select
              name="role"
              onChange={handleChange}
              defaultValue={data.role}
              required
            >
              <option value="점장">점장</option>
              <option value="매니저">매니저</option>
              <option value="트레이너">트레이너</option>
              <option value="인포">인포직원</option>
              <option value="필라테스 강사">필라테스 강사</option>
            </select>
          </div>
          <div className={styles.pic}>
            {data.image === CHECK_IMAGE_WORD ? (
              <img src={UserIcon} alt="profile icon" className={styles.icon} />
            ) : (
              <div className={styles.editImageWrapper}>
                <img src={data.image as string} alt="profile" />
              </div>
            )}
          </div>
        </div>
      </CreateHeader>

      <section className={styles.container}>
        <div className={styles.contentWrapper}>
          <CreateContent idx="01" title="연락처 설정">
            <CreateInput type="text">
              <input
                type="text"
                placeholder="번호를 입력해주세요"
                ref={contactRef}
                required
                defaultValue={data.contact}
                className={styles.textInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="02" title="강사 정보 설정">
            <CreateInput type="text">
              <input
                type="text"
                placeholder="추가 정보를 입력해주세요"
                ref={introductionRef}
                defaultValue={data.introduction}
                className={styles.textInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="03" title="근무 요일 설정">
            <CreateInput type="radio" labelId="월-금" labelValue="월-금">
              <input
                type="radio"
                name="workDay"
                id="월-금"
                value="월-금"
                onChange={handleChange}
                required
                defaultChecked={data.workDay === "월-금"}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="주말" labelValue="주말">
              <input
                type="radio"
                name="workDay"
                id="주말"
                value="주말"
                onChange={handleChange}
                required
                defaultChecked={data.workDay === "주말"}
                className={styles.labelInput}
              />
            </CreateInput>
            <CreateInput type="radio" labelId="기타" labelValue="기타">
              <input
                name="workDay"
                type="radio"
                id="기타"
                value="기타"
                onChange={handleChange}
                required
                defaultChecked={
                  data.workDay !== "월-금" && data.workDay !== "주말"
                }
                className={styles.labelInput}
              />
            </CreateInput>
            {workDay !== "월-금" && workDay !== "주말" ? (
              <div className={styles.workDayInput}>
                <input
                  type="text"
                  id="workDay"
                  name="workDay"
                  placeholder="근무 요일을 입력해주세요"
                  required
                  onChange={handleChange}
                  defaultValue={data.workDay}
                  className={styles.textInput}
                />
              </div>
            ) : null}
          </CreateContent>
          <CreateContent idx="04" title="입사일 설정">
            <CreateInput type="text">
              <input
                type="date"
                placeholder="입사일을 입력해주세요"
                defaultValue={data.startDate}
                ref={startDateRef}
                required
                className={styles.textInput}
              />
            </CreateInput>
          </CreateContent>

          <CreateContent idx="05" title="대표 색상 설정">
            <CreateInput type="text">
              <div className={styles.colorWrapper}>
                {mainColor.map((el, idx) => (
                  <label key={idx}>
                    <input
                      type="checkbox"
                      id={el.color}
                      onChange={handleChangeColor}
                      checked={el.checked}
                    />
                    <div
                      className={` ${styles.colorBox} ${
                        el.checked
                          ? `${styles[`${el.color}`]} ${styles.checked}`
                          : `${styles[`${el.color}`]}`
                      }`}
                    ></div>
                  </label>
                ))}
              </div>
            </CreateInput>
          </CreateContent>
        </div>
      </section>
      <FinishButton content="수정 완료" />
    </form>
  );
};

export default MemberEdit;
