import { useState, useCallback } from 'react';

export default () => {
  const [value, SetValue] = useState('');
  const handler = useCallback(
    (e) => {
      SetValue(e.target.value);
    },
    [value]
  );

  return [value, handler];
};
