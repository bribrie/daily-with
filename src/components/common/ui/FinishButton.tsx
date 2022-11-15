import styles from "styles/common/ui/FinishButton.module.scss";

interface ButtonProps {
  content: string;
}

const FinishButton = ({ content }: ButtonProps) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.content}>{content}</button>
    </div>
  );
};

export default FinishButton;
