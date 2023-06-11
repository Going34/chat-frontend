import { useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const useDebounce = (value:string, delay:number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
