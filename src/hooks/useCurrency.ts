import { ChangeEvent, useState, useCallback } from "react";

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "KRW",
});

const useCurrency = (initial: string) => {
  const [price, setPrice] = useState(initial);

  const handlePrice = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    const formatValue = CURRENCY_FORMATTER.format(value);
    setPrice(formatValue);
  }, []);

  return [price, handlePrice] as const;
};

export default useCurrency;
