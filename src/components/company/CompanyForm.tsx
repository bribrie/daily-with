import { ReactComponent as Home } from "assets/images/Home.svg";
import { ReactComponent as Phone } from "assets/images/Phone.svg";
import { ReactComponent as Location } from "assets/images/Location.svg";
import { ReactComponent as Time } from "assets/images/Time.svg";
import { ReactComponent as Clip } from "assets/images/Clip.svg";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  RefObject,
} from "react";
import { CompanyLinkState, CompanyBasicState } from "redux/types";
import CompanyHeader from "./CompanyHeader";
import FinishButton from "components/common/ui/FinishButton";
import styles from "styles/company/CompanyForm.module.scss";

interface FormProps {
  currentCenterName: string;
  basicInfo: CompanyBasicState[];
  centerNameRef: RefObject<HTMLInputElement>;
  phoneNumberRef: RefObject<HTMLInputElement>;
  locationRef: RefObject<HTMLInputElement>;
  handleTimeChange: ChangeEventHandler;
  handleLinkChange: ChangeEventHandler;
  handleAddLinkList: MouseEventHandler;
  handleDeletLinkList: (orderNumber: number) => void;
  handleSubmit: FormEventHandler;
  addedLinkList: CompanyLinkState[];
  siteName: string;
  siteUrl: string;
  timeData: any[];
  addItemCount: () => void;
}
const CompanyForm = ({
  currentCenterName,
  basicInfo,
  centerNameRef,
  phoneNumberRef,
  locationRef,
  handleTimeChange,
  handleLinkChange,
  handleAddLinkList,
  handleDeletLinkList,
  handleSubmit,
  addedLinkList,
  siteName,
  siteUrl,
  timeData,
  addItemCount,
}: FormProps) => {
  return (
    <div className={styles.container}>
      <form className={styles.listWrapper} onSubmit={handleSubmit}>
        <CompanyHeader title="센터 이름" icon={<Home />}>
          <div className={styles.content}>
            <input
              type="text"
              required
              defaultValue={currentCenterName}
              ref={centerNameRef}
            />
          </div>
        </CompanyHeader>

        <CompanyHeader title="전화 번호" icon={<Phone />}>
          <div className={styles.content}>
            <input
              type="tel"
              required
              autoFocus
              defaultValue={
                basicInfo.length !== 0 ? basicInfo[0].phoneNumber : ""
              }
              ref={phoneNumberRef}
            />
          </div>
        </CompanyHeader>

        <CompanyHeader title="위치" icon={<Location />}>
          <div className={styles.content}>
            <input
              type="text"
              ref={locationRef}
              defaultValue={basicInfo.length !== 0 ? basicInfo[0].location : ""}
              required
            />
          </div>
        </CompanyHeader>

        <CompanyHeader title="운영 시간" icon={<Time />}>
          <div className={styles.timeWrapper}>
            {timeData.map((data) => (
              <div className={styles.timeItem} key={data.title}>
                {data.title === "휴일" ? (
                  <>
                    <div className={styles.holiday}>{data.title}</div>
                    <div className={`${styles.time} ${styles.holidyDate}`}>
                      <input
                        type="text"
                        name={data.name}
                        defaultValue={data.date}
                        required
                        onChange={handleTimeChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.time}>
                      <div className={styles.inputWrapper}>
                        오전
                        <input
                          type="text"
                          name={`${data.name}Open`}
                          required
                          defaultValue={data.open}
                          onChange={handleTimeChange}
                          className={styles.timeInput}
                        />
                        시
                      </div>
                      <div className={styles.hyphen}>-</div>
                      <div className={styles.inputWrapper}>
                        오후
                        <input
                          type="text"
                          name={`${data.name}Close`}
                          defaultValue={data.close}
                          onChange={handleTimeChange}
                          required
                          className={styles.timeInput}
                        />
                        시
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CompanyHeader>

        <CompanyHeader title="연계 사이트" icon={<Clip />}>
          <div className={styles.siteWrapper}>
            {addedLinkList.length !== 0 ? (
              <>
                {addedLinkList.map((el, idx) => (
                  <div className={styles.siteItem} key={idx}>
                    <div className={styles.siteTitle}>{el.name}</div>
                    <div className={styles.siteUrl}>{el.url}</div>
                    <div
                      className={styles.siteButton}
                      onClick={() => handleDeletLinkList(el.orderNumber)}
                    >
                      삭제
                    </div>
                  </div>
                ))}
              </>
            ) : null}
            <div className={styles.siteItem}>
              <div className={styles.siteTitle}>
                <input
                  type="text"
                  placeholder="사이트 이름"
                  name="name"
                  value={siteName}
                  onChange={handleLinkChange}
                />
              </div>
              <div className={styles.siteUrl}>
                <input
                  type="url"
                  placeholder="https://example.com"
                  pattern="https://.*"
                  name="url"
                  value={siteUrl}
                  onChange={handleLinkChange}
                />
              </div>
              <div onClick={handleAddLinkList} className={styles.siteButton}>
                등록
              </div>
            </div>
            <div className={styles.siteItem}>
              <Plus fill="lightblue" onClick={addItemCount} />
            </div>
          </div>
        </CompanyHeader>

        <FinishButton content="저장" />
      </form>
    </div>
  );
};

export default CompanyForm;
