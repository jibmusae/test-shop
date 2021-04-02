import { useState, useCallback } from "react";

export default (initialValue) => {
  const [value, SetValue] = useState(initialValue);
  const handler = useCallback((e) => {
    SetValue(e.target.value);
  }, []);

  return [value, setValue];
};
