import styles from "styles/layout/Loading.module.scss";

interface Props {
  type?: string;
}

const Loading = ({ type }: Props) => {
  return (
    <div
      className={
        type
          ? `${styles.container} ${styles[`${type}`]}`
          : `${styles.container}`
      }
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
