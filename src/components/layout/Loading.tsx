import styles from "styles/layout/Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
