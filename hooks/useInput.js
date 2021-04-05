import { useState, useCallback } from "react";

export default (initialValue = null) => {
  const [value, SetValue] = useState(initialValue);
  const handler = useCallback((e) => {
    SetValue(e.target.value);
  }, []);

  return [value, handler];
};
