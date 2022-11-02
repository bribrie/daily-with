import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import styles from "styles/layout/create/CreateButton.module.scss";

const CreateButton = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="create">
        <button>
          <Plus stroke="white" />
        </button>
      </Link>
    </div>
  );
};

export default CreateButton;
