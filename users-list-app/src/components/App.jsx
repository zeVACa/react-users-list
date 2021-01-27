import React from 'react';

import '../index.scss';

const App = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [prevPageUsers, setPrevtPageUsers] = React.useState([]);
  const [prevPrevPageUsers, setPrevPrevPageUsers] = React.useState([]);
  const [nextPageUsers, setNextPageUsers] = React.useState([]);
  const [nextNextPageUsers, setNextNextPageUsers] = React.useState([]);

  const getPrevPageUsersHandler = (event) => {};

  const getNextPageUsersHandler = (event) => {
    setPageNumber(pageNumber + 1);

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setNextPageUsers(jsonArray);
          return jsonArray;
        });
      },
    );

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber + 1}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setNextNextPageUsers(jsonArray);
          return jsonArray;
        });
      },
    );

    if (nextNextPageUsers.length === 0) {
      event.currentTarget.classList.toggle('active');
    }
  };

  /* не до конца понимаю, как правильнее сделать пагинацию, через кеширование "page + 2" и проверки его пустоту тем времинем из кеша рендерить, или же делать два фетч запроса на "page + 1" && "page + 2" и проверки "page + 2" на пустоту */
  // мне показался второй вариант более правильным с позиции актуальности данных. Тип пользователь может нажать на nextPageButton через 2 часа после предыдущего клика.

  React.useEffect(() => {
    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          //  console.log(jsonArray);

          setNextPageUsers(jsonArray);

          //  console.log(new Date().getSeconds());
          return jsonArray;
        });
      },
    );

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber + 1}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          //  console.log(jsonArray);

          setNextNextPageUsers(jsonArray);

          //  console.log(new Date().getSeconds());
          return jsonArray;
        });
      },
    );
  }, [pageNumber]);

  return (
    <div className="app">
      <ul className="users">
        <li className="users__item">
          <div className="users__item-name">Leanne Graham</div>
          <div className="users__item-email">Sincere@april.biz</div>
        </li>
      </ul>
      <div className="buttons">
        <button
          onClick={(event) => {
            if (event.currentTarget.classList.contains('active')) {
              setPageNumber(pageNumber - 1);
            }
          }}>
          {'<-'}
        </button>
        <button onClick={getNextPageUsersHandler} className="active">
          {'->'}
        </button>
      </div>
    </div>
  );
};

export default App;
