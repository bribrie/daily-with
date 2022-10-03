import { PriceListType } from "redux/types";
import styles from "styles/price/PriceItem.module.scss";

const PriceItem = ({
  type,
  title,
  period,
  price,
  delay,
  event,
}: PriceListType) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <div>{type}</div>
            <div>•</div>
            <div>{period}</div>
            <div>•</div>
            <div>{delay}일</div>
            {/* {event && <div>*Event*</div>} */}
          </div>

          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>{price} 원</div>
        </div>
      </div>
    </>
  );
};

export default PriceItem;
