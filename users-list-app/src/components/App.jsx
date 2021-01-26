import React from 'react';

import '../index.scss';

const App = () => {
  fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=1&limit=10`).then((res) => {
    res.json().then((data) => {
      console.log(data);
      return data;
    });
  });

  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="app">
      <ul className="users">
        <li className="users__item">
          <div className="users__item-name">Leanne Graham</div>
          <div className="users__item-email">Sincere@april.biz</div>
        </li>
      </ul>
      <div className="buttons">
        <button>{'<-'}</button>
        <button className="active">{'->'}</button>
      </div>
    </div>
  );
};

export default App;
