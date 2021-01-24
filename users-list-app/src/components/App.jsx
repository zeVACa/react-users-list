import React from 'react';

import '../index.css';

import InputSearch from './InputSearch';
import CardList from './CardList';

function App() {
  console.log('рендер App');

  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <div className="container">
        <div className="col-sm-5">
          <h1>{inputValue}</h1>
          <InputSearch value={inputValue} setInputValue={setInputValue} />
        </div>
        <CardList inputValue={inputValue} />
      </div>
    </div>
  );
}

export default App;
