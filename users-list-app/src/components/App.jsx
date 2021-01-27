import React from 'react';

import '../index.scss';

const App = () => {
  console.log('<App /> was rendered');

  const [pageNumber, setPageNumber] = React.useState(1);

  const [prevPageUsers, setPrevtPageUsers] = React.useState([]);
  const [isPrevButtonActive, togglePrevButtonActive] = React.useState(false);

  const [currentPageUsers, setCurrentPageUsers] = React.useState([]);

  const [nextPageUsers, setNextPageUsers] = React.useState([]);
  const [isNextButtonActive, toggleNextButtonActive] = React.useState(true);

  const getPrevUsersHandler = (event) => {
    setPageNumber(pageNumber - 1);
    toggleNextButtonActive(true);

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setCurrentPageUsers(jsonArray);
          console.log('fetch current', jsonArray);
          return jsonArray;
        });
      },
    );

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber - 1}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setNextPageUsers(jsonArray);
          console.log('fetch prev', jsonArray);

          console.log(event);
          console.log(event.target);

          if (jsonArray.length === 0) {
            togglePrevButtonActive(false);
          }

          return jsonArray;
        });
      },
    );
  };

  const getNextUsersHandler = (event) => {
    setPageNumber(pageNumber + 1);
    togglePrevButtonActive(true);

    //  disableButton();
    if (nextPageUsers.length === 0) {
      event.target.classList.toggle('active');
      event.target.disabled = true;
      return;
    }

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setCurrentPageUsers(jsonArray);
          console.log('fetch current', jsonArray);
          return jsonArray;
        });
      },
    );

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber + 1}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          setNextPageUsers(jsonArray);
          console.log('fetch next', jsonArray);

          console.log(event);
          console.log(event.target);

          if (jsonArray.length === 0) {
            toggleNextButtonActive(false);
          }

          return jsonArray;
        });
      },
    );
  };

  /* не до конца понимаю, как правильнее сделать пагинацию, через кеширование "page + 2" и проверки его пустоту тем времинем из кеша рендерить, или же делать два фетч запроса на "page + 1" && "page + 2" и проверки "page + 2" на пустоту */
  // мне показался второй вариант более правильным с позиции актуальности данных. Тип пользователь может нажать на nextPageButton через 2 часа после предыдущего клика.

  React.useEffect(() => {
    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          console.log('fetch current ', jsonArray);

          setCurrentPageUsers(jsonArray);

          // нужен ли ретёрн в таких запросах или чисто хуки?
        });
      },
    );

    fetch(`https://5c3755177820ff0014d92711.mockapi.io/users?page=${pageNumber + 1}&limit=10`).then(
      (res) => {
        res.json().then((jsonArray) => {
          console.log('fetch next', jsonArray);

          setNextPageUsers(jsonArray);
        });
      },
    );
  }, []);

  // канон ли класснейм тернарником монитрить изменение стейта?
  return (
    <div className="app">
      <ul className="users">
        {currentPageUsers.map((item) => {
          return (
            <li className="users__item">
              <div className="users__item-name">{item.name}</div>
              <div className="users__item-email">{item.email}</div>
            </li>
          );
        })}
      </ul>
      <div className="buttons">
        <button
          onClick={getPrevUsersHandler}
          className={isPrevButtonActive ? 'active' : ''}
          disabled={isPrevButtonActive ? false : true}>
          {'<-'}
        </button>
        <button
          onClick={getNextUsersHandler}
          className={isNextButtonActive ? 'active' : ''}
          disabled={isNextButtonActive ? false : true}>
          {'->'}
        </button>
      </div>
    </div>
  );
};

export default App;
