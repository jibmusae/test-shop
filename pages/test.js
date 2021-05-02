import React, { useState } from 'react';

export default function test() {
  const [count, setCount] = useState(1);
  const onChangeCount = (e) => {
    console.log(`e.target.value : ${e.target.value}, count : ${count}`);
    setCount(e.target.value);
    console.log(`e.target.value : ${e.target.value}, count : ${count}`);
  };

  return (
    <>
      <style jsx>
        {`
          .count {
            border: 1px solid #000;
          }
        `}
      </style>
      <input className="count" value={count} onInput={onChangeCount} />
    </>
  );
}
