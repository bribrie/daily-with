import { ChangeEventHandler, FormEventHandler, RefObject } from "react";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import CreateHeader from "components/layout/create/CreateHeader";
import CreateContent from "components/layout/create/CreateContent";
import CreateInput from "components/layout/create/CreateInput";
import FinishButton from "components/common/ui/FinishButton";
import styles from "styles/member/MemberForm.module.scss";

interface MemeberFormProps {
  nameRef: RefObject<HTMLInputElement>;
  roleRef: RefObject<HTMLSelectElement>;
  contactRef: RefObject<HTMLInputElement>;
  workDay: string;
  imageUrl: string | undefined;
  introductionRef: RefObject<HTMLInputElement>;
  handleProfileImage: ChangeEventHandler;
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
}

const MemberForm = ({
  nameRef,
  roleRef,
  contactRef,
  workDay,
  introductionRef,
  imageUrl,
  handleProfileImage,
  handleChange,
  handleSubmit,
}: MemeberFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <CreateHeader title="직원 등록" linkAddress="/member" linkName="직원">
        <div className={styles.infoWrapper}>
          <div className={styles.name}>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              ref={nameRef}
              required
            />
          </div>
          <div className={styles.role}>
            <select name="role" ref={roleRef} required>
              <option value="점장">점장</option>
              <option value="매니저">매니저</option>
              <option value="트레이너">트레이너</option>
              <option value="인포">인포직원</option>
              <option value="필라테스 강사">필라테스 강사</option>
            </select>
          </div>
          <div className={styles.pic}>
            {!imageUrl ? (
              <>
                <label htmlFor="pic">
                  <Plus stroke="#c6c8ca" />
                </label>
                <input
                  id="pic"
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={handleProfileImage}
                />
              </>
            ) : (
              <div className={styles.imageWrapper}>
                <img src={imageUrl} alt="profile" />
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
                defaultChecked
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
                  className={styles.textInput}
                />
              </div>
            ) : null}
          </CreateContent>
        </div>
      </section>
      <FinishButton content="등록 완료" />
    </form>
  );
};

export default MemberForm;
