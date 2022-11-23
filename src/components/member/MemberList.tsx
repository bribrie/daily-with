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
      <div className={styles.headerWrapper}>
        <div className={styles.count}>총 {list.length} 명의 직원</div>
        <SearchBar
          placeholder="직원 이름을 입력해주세요."
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
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
            introduction={data.introduction}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberList;
