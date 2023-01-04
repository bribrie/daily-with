const month = new Date().getMonth() + 1;
export const THIS_MONTH = month.toString().length === 1 ? `0${month}` : month;
export const THIS_YEAR = new Date().getFullYear();
export const TWO_DIGIT_YEAR = new Date()
  .getFullYear()
  .toString()
  .substring(2, 4);

const dayLength = new Date().getDate().toString().length;
export const DAY =
  dayLength === 1 ? `0${new Date().getDate()}` : new Date().getDate();
export const INPUT_TODAY_FORMAT = `${THIS_YEAR}-${THIS_MONTH}-${DAY}`;
//dashboard format
export const TODAY = `${THIS_YEAR}년 ${THIS_MONTH}월 ${DAY}일`;
//monthly target format
export const MONTHLY_TARGET_DATE = `${TWO_DIGIT_YEAR}년 ${THIS_MONTH}월`;
//visit format
export const VISIT_DATE = `${TWO_DIGIT_YEAR}.${THIS_MONTH}.${DAY}`;
export const VISIT_FILTER_MONTH_START = `${TWO_DIGIT_YEAR}.${THIS_MONTH}.01`;
export const VISIT_FILTER_MONTH_FINISH = `${TWO_DIGIT_YEAR}.${THIS_MONTH}.31`;

export const SALES_FILTER_MONTH_STRART = `${THIS_YEAR}-${THIS_MONTH}-01`;
export const SALES_FILTER_MONTH_FINISH = `${THIS_YEAR}-${THIS_MONTH}-31`;
