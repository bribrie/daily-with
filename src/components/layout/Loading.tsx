import styles from "styles/layout/Loading.module.scss";

interface Props {
  type?: string;
}

const Loading = ({ type }: Props) => {
  return (
    <div
      className={type ? `${styles.container} ${styles.all}` : `${styles.main}`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
