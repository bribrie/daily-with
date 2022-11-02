import { KeyboardEventHandler, MouseEventHandler } from "react";
import { ReactComponent as Reset } from "assets/images/ResetButton.svg";
import styles from "styles/common/ui/SearchBar.module.scss";

interface SearchProps {
  placeholder: string;
  handleSearch: KeyboardEventHandler;
  handleReset: MouseEventHandler;
}

const SearchBar = ({ placeholder, handleSearch, handleReset }: SearchProps) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleSearch}
        className={styles.searchBar}
      />
      <button className={styles.resetButton} onClick={handleReset}>
        <Reset fill="white" />
      </button>
    </div>
  );
};

export default SearchBar;
