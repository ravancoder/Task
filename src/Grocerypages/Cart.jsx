import Button from "react-bootstrap/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, removeProducts } from "../Slices/ProductSlice";
const Cart = () => {
  const quantity = useSelector((state) => state.Product.Quantity);
  const products = useSelector((state) => state.Product.Products);
  const dispatch = useDispatch();

  const items = products
    .map((e) => ({
      ...e,
      qty: quantity[e.id] || 0,
    }))
    .filter((qt) => qt.qty > 0);

  const subtotal = items.reduce((total, num) => {
    return total + num.price * num.qty;
  }, 0);

  const cheese = items.find((x) => x.name === "Cheese");
  const bread = items.find((x) => x.name === "Bread");
  const soup = items.find((x) => x.name === "Soup");
  const butter = items.find((x) => x.name === "Butter");

  const cheeseoffer = cheese ? Math.floor(cheese.qty / 2) * cheese.price : 0;

  const checkofferqualify = bread && soup ? Math.min(bread.qty, soup.qty) : 0;
  const breadoffer = bread ? checkofferqualify * (bread.price * 0.5) : 0;
  const butteroffer = butter ? (butter.price / 3) * butter.qty : 0;

  const totalsavings = cheeseoffer + breadoffer + butteroffer;
  const total = subtotal - totalsavings;

  console.log(subtotal);

  const fullitem = items.map((i) => {
    let ogPrice = i.price * i.qty;
    let itemSavings = 0;
    let offerPrice = ogPrice;

    if (i.name === "Bread") {
      itemSavings = breadoffer;
      offerPrice = ogPrice - breadoffer;
    } else if (i.name === "Cheese") {
      itemSavings = cheeseoffer;
      offerPrice = ogPrice - cheeseoffer;
    } else if (i.name === "Butter") {
      itemSavings = butteroffer;
      offerPrice = ogPrice - butteroffer;
    } else {
      itemSavings = 0;
      offerPrice = ogPrice;
    }
    if (offerPrice < 0) offerPrice = 0;
    return {
      ...i,
      ogPrice,
      offerPrice,
      itemSavings,
    };
  });

  if (items.length === 0) {
    return <></>;
  }

  return (
    <div className="Basket col-md-4 col-12 mx-auto border p-3 mt-5 border rounded align-items-center">
      <h1 className="border-bottom text-left">Basket</h1>
      {fullitem.map((i) => (
        <div key={i.id}>
          <div className="d-flex justify-content-between my-2  p-2">
            <p className="fs-5 fw-bold">{i.name}</p>
            <p className="fs-5 fw-bold">£{i.price}</p>
            <div className="calc">
              <div className="counter d-flex justify-content-end align-items-center mb-1">
                <Button
                  variant="outline-primary"
                  className=" fs-6"
                  onClick={() => dispatch(addProducts(i.id))}
                >
                  +
                </Button>
                <strong className="p-2">{i.qty}</strong>
                <Button
                  variant="outline-primary"
                  className=" fs-6"
                  onClick={() => dispatch(removeProducts(i.id))}
                >
                  -
                </Button>
              </div>
              <p className="text-secondary text-end mb-0">
                Item price is £{i.price} * {i.qty} = £{i.ogPrice.toFixed(2)}
              </p>
            </div>
          </div>
          {i.itemSavings > 0 ? (
            <p className="text-end mb-0  fw-bold text-danger pb-1 border-bottom">
              Savings £{i.itemSavings.toFixed(2)}
            </p>
          ) : (
            ""
          )}
          <p className="text-end mb-0 fs-6 fw-bold  p-1 border-bottom">
            Item Cost £{i.offerPrice.toFixed(2)}
          </p>
        </div>
      ))}
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between fs-4 fw-bold p-2 my-2">
          <strong>Sub Total:</strong> <span>£{subtotal.toFixed(2)}</span>
        </li>
        <li className="d-flex justify-content-between fs-4 fw-bold p-2 mb-2">
          <strong>Savings:</strong>
          <span>£{totalsavings.toFixed(2)}</span>
        </li>
        <li className="d-flex justify-content-between fs-4 fw-bold p-2 mb-2">
          <strong>Total Amount:</strong>
          <span>£{total.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default Cart;
