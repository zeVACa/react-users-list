import React from 'react';
import Card from './Card';

import cardsDataResponse from '../data.json';

function CardList({ inputValue }) {
  console.log('рендер CardList');

  return (
    <div className="container">
      <div className="row">
        {cardsDataResponse
          .filter((data) => {
            const titleLower = data.title.toLowerCase();
            const descriptionLower = data.description.toLowerCase();
            const inputLower = inputValue.toLowerCase();

            return titleLower.includes(inputLower) || descriptionLower.includes(inputLower);
          })
          .map((item) => (
            <Card
              key={item.image}
              imgUrl={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
}

export default CardList;
