import React, { useState } from "react";

const Cart = ({ handleAddProduct, currentCart }) => {
  const [productData, setProductData] = useState({});

  return (
    <main>
      <div>
        <h1>Add product in carts</h1>

        <form>
          <div>
            <label>Enter product name</label>
            <input
              type="text"
              maxLength="20"
              onChange={(event) =>
                setProductData({
                  ...productData,
                  productName: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Enter product price</label>
            <input
              type="number"
              onChange={(event) =>
                setProductData({
                  ...productData,
                  productprice: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Choose if shipping required</label>
            <input
              type="radio"
              id="shippingRequired"
              name="shippingRequired"
              value={true}
              onChange={(event) =>
                setProductData({
                  ...productData,
                  isShipingRequired: true,
                })
              }
            />
            <label htmlFor="shippingRequired">Yes</label>
            <input
              type="radio"
              id="shippingNotRequired"
              name="shippingRequired"
              value={false}
              onChange={(event) =>
                setProductData({
                  ...productData,
                  isShipingRequired: false,
                })
              }
            />
            <label htmlFor="shippingNotRequired">No</label>
          </div>
          <button type="submit" onClick={handleAddProduct}>
            Add product
          </button>
        </form>
        <button onClick={(event) => send({ type: "ADD_ADDRESS" })}>
          Add address
        </button>
      </div>
      <div>
        <h1>Products in carts</h1>
        {currentCart.context.allProducts.length > 0 &&
          currentCart.context.allProducts.map((product, key) => {
            if (!product) {
              return;
            }

            const { productName, productprice, isShipingRequired } = product;

            return (
              <div key={key}>
                <h1>{key}</h1>
                <h3>Name - {productName}</h3>
                <h3>Price - {productprice}</h3>
                <h3>
                  {isShipingRequired
                    ? "Shipping required"
                    : "Shipping not required"}
                </h3>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Cart;
