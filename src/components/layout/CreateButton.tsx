import Plus from "assets/images/Plus.svg";
import { Link } from "react-router-dom";
import styles from "styles/layout/CreateButton.module.scss";

const CreateButton = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="create">
        <button>
          <img src={Plus} alt="Add new price button" />
        </button>
      </Link>
    </div>
  );
};

export default CreateButton;
