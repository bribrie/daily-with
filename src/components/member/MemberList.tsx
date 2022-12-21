import { KeyboardEventHandler, MouseEventHandler } from "react";
import { MemeberListType } from "redux/types";
import SearchBar from "components/common/ui/SearchBar";
import MemberItemContainer from "containers/member/MemberItemContainer";
import styles from "styles/member/MemberList.module.scss";

interface ListProps {
  list: MemeberListType[];
  handleSearch: KeyboardEventHandler;
  handleReset: MouseEventHandler;
}

const MemberList = ({ list, handleSearch, handleReset }: ListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.count}>총 {list.length} 명의 직원</div>
          <SearchBar
            placeholder="직원 이름을 입력해주세요."
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
        </div>
        {list.length === 0 ? (
          <div className={styles.noneWrapper}>
            <div>등록된 직원이 없습니다.</div>
          </div>
        ) : (
          <div className={styles.listWrapper}>
            {list.map((data) => (
              <MemberItemContainer
                key={data.id}
                id={data.id}
                role={data.role}
                image={data.image}
                name={data.name}
                contact={data.contact}
                workDay={data.workDay}
                startDate={data.startDate}
                introduction={data.introduction}
                mainColor={data.mainColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;
