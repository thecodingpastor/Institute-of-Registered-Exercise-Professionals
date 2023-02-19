import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  condition: boolean = true
) {
  const [Value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    if (condition) {
      localStorage.setItem(key, JSON.stringify(Value));
    }
  }, [key, Value, condition]);

  return [Value, setValue] as [T, typeof setValue];
}
