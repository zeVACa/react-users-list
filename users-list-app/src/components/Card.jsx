const Card = (props) => {
  console.log('рендер Card');

  return (
    <div className="col-xl-3 col-md-6 d-flex align-items-stretch mb-5">
      <div className="card">
        <img className="card-img-top" src={props.imgUrl} alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
