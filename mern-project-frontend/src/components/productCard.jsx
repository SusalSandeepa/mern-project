import "./productCard.css"
export default function ProductCard(props) {  // we need to capital the first letter of the component name becauseit is used as a JSX tag

    // props is an object that contains all the properties passed to the component from app.jsx(inside jsx tags <ProductCard />)

  return (
    <div className="productCard">
        <h2>{props.name}</h2>
        <img 
            className="productImage" 
            src={props.image} 
            alt={props.name} // when image is not working it will show the name of the product
        />
        <p>{props.price} </p>
        <button>Add to cart</button> 
    </div>
  );
} 