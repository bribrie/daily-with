import { useState, useCallback, ChangeEvent } from "react";

/** TODO: any 타입 수정하기 => 완료!
 * 1. Tuple | add a return type
 *  ( ininitalValue: InputType): [InputType, (e: ChangeEvent<HTMLInputElement>) => void] => {};
 
 * 2. as const | freeze the array to a tuple
 * return [form, handleChange] as const
 */

interface InputType {
  [key: string]: string;
}

const useInput = (ininitalValue: InputType) => {
  const [form, setForm] = useState(ininitalValue);

  const handleReset = useCallback(() => {
    setForm(ininitalValue);
  }, [ininitalValue]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return [form, handleChange, handleReset] as const;
};

export default useInput;
