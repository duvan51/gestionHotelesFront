import React from "react";

const Product = ({data}) => {

    console.log(data)

  return (
    <div>
      <div className="card" >
      <div className="cardImage">
        <img src={data.imagePrincipal} className="card-img-top"  />
      </div>
        <div className="card-body"> 
          <h5 className="card-title">{(data.title)}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
