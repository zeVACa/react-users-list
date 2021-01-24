import React from 'react';

function InputSearch({ setInputValue, value }) {
  // const value;

  console.log('рендер InputSearch');

  return (
    <input
      type="text"
      onChange={(event) => {
        const inputValue = event.target.value;
        console.log(inputValue);
        setInputValue(inputValue);
      }}
      value={value}
      placeholder="search"
      className="my-3 form-control"
    />
  );
}

export default InputSearch;
