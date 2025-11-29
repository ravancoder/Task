import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../Slices/ProductSlice";
const ProductList = () => {
  const items = useSelector((state) => state.Product.Products);
  const dispatch = useDispatch();
  return (
    <div className="ProductList col-md-4 col-12 mx-auto mt-5 p-3 border rounded">
      <h1 className="border-bottom">Product List </h1>
      <p className="p-2 bg-success ani text-white text-center fs-6 fw-bold rounded">
        When you Buy a Cheese You get a Cheese Free
        <br /> When you buy a soap you get a half price Bread <br /> Get a third
        Off butter <br />
      </p>
      <ul className="list-unstyled mt-4">
        {items.map((i) => (
          <li
            key={i}
            className="row d-flex justify-content-between align-items-center mb-2 p-2"
          >
            <p className="mb-0 fs-5 fw-bold col-4">{i.name}</p>
            <span className="fs-5 fw-bold col-4">£{i.price}</span>
            <Button
              variant="secondary"
              className="col-2 button"
              onClick={() => dispatch(addProducts(i.id))}
            >
              Add
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
