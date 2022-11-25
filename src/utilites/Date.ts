export const THIS_MONTH = new Date().getMonth() + 1;
export const THIS_YEAR = new Date().getFullYear();
export const TWO_DIGIT_YEAR = new Date()
  .getFullYear()
  .toString()
  .substring(2, 4);
export const DAY = new Date().getDate();
export const INPUT_TODAY_FORMAT = `${THIS_YEAR}-${THIS_MONTH}-${DAY}`;

export const TODAY = `${new Date().getFullYear()}년 ${
  new Date().getMonth() + 1
}월 ${new Date().getDate()}일`;

export const MONTHLY_TARGET_DATE = `${TWO_DIGIT_YEAR}년 ${THIS_MONTH}월`;
