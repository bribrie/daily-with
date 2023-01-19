import { ReactComponent as Home } from "assets/images/Home.svg";
import { ReactComponent as Phone } from "assets/images/Phone.svg";
import { ReactComponent as Location } from "assets/images/Location.svg";
import { ReactComponent as Time } from "assets/images/Time.svg";
import { ReactComponent as Clip } from "assets/images/Clip.svg";
import {
  CompanyLinkState,
  CompanyBasicState,
  CompanyTimeState,
} from "redux/types";
import CompanyHeader from "./CompanyHeader";
import styles from "styles/company/CompanyInfo.module.scss";

export interface CompanyProps {
  username: string | null;
  basicInfo: CompanyBasicState[];
  timeInfo: CompanyTimeState[];
  linkInfo: CompanyLinkState[];
}

const CompanyInfo = ({
  username,
  basicInfo,
  timeInfo,
  linkInfo,
}: CompanyProps) => {
  const timeData = timeInfo.length !== 0 && [
    {
      title: "평일",
      open: timeInfo[0].weekdayOpen,
      close: timeInfo[0].weekdayClose,
    },
    {
      title: "주말",
      open: timeInfo[0].weekendOpen,
      close: timeInfo[0].weekendClose,
    },
    {
      title: "공휴일",
      open: timeInfo[0].holidayTimeOpen,
      close: timeInfo[0].holidayTimeClose,
    },

    {
      title: "휴일",
      data:
        timeInfo[0].holidayDate === "" ? "연주무휴" : timeInfo[0].holidayDate,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        <CompanyHeader title="센터 이름" icon={<Home />}>
          <div className={styles.content}>
            {username ? username : "등록된 센터 이름이 없습니다."}
          </div>
        </CompanyHeader>

        <CompanyHeader title="전화 번호" icon={<Phone />}>
          <div className={styles.content}>
            {basicInfo.length !== 0
              ? basicInfo[0].phoneNumber
              : "등록된 번호가 없습니다."}
          </div>
        </CompanyHeader>

        <CompanyHeader title="위치" icon={<Location />}>
          <div className={styles.content}>
            {basicInfo.length !== 0
              ? basicInfo[0].location
              : "등록된 주소가 없습니다."}
          </div>
        </CompanyHeader>

        <CompanyHeader title="운영 시간" icon={<Time />}>
          <div className={styles.timeWrapper}>
            {timeData
              ? timeData.map((item) => (
                  <div className={styles.timeItem} key={item.title}>
                    <div className={item.data ? styles.holiday : styles.title}>
                      {item.title}
                    </div>
                    <div className={styles.time}>
                      {item.data ? (
                        <div className={styles.holidayTime}>{item.data}</div>
                      ) : (
                        <>
                          <div>오전 {item.open} 시</div>
                          <div className={styles.hyphen}>-</div>
                          <div className={styles.close}>
                            오후 {item.close} 시
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              : " 등록된 운영 시간이 없습니다."}
          </div>
        </CompanyHeader>

        <CompanyHeader title="연계 사이트" icon={<Clip />}>
          <>
            {linkInfo.length === 0 ? (
              <div className={styles.noneContent}>
                등록된 연계 사이트가 없습니다.
              </div>
            ) : (
              <div className={styles.siteWrapper}>
                {linkInfo.map((el) => (
                  <div className={styles.siteItem} key={el.orderNumber}>
                    <a href={el.url} target="_blank" rel="noreferrer">
                      {el.name}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        </CompanyHeader>
      </div>
    </div>
  );
};

export default CompanyInfo;
