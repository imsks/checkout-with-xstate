import { useMachine } from "@xstate/react";
import { useState } from "react";
import { cartMachine } from "./xState/machines";

const Home = () => {
  const [currentCart, send] = useMachine(cartMachine);
  const [productData, setProductData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // 1. Cart state match
  const cartState = ["cart_no_products", "carts_with_products"].some(
    currentCart.matches
  );

  // 2. Address state match
  const addressState = ["add_address"].some(currentCart.matches);

  // 3. Shipping state match
  const shippingState = ["shipping"].some(currentCart.matches);

  // 4. Payment state match
  const paymentState = ["payment"].some(currentCart.matches);

  // 5. Summary state match
  const summaryState = ["summary"].some(currentCart.matches);

  // 1. Add a product
  const handleAddProduct = (event) => {
    event.preventDefault();
    send({ type: "ADD_PRODUCT", data: { ...productData } });
  };

  // 2. Save shipping address
  const handleSaveAddress = (event) => {
    event.preventDefault();
    // console.log(currentCart.value);
    send({ type: "SUBMIT_ADDRESS", data: { ...addressData } });
  };

  // 3. Save shipping methode
  const handleSaveShippingMethod = (event) => {
    event.preventDefault();

    send({ type: "SUBMIT_SHIPPING_METHOD", data: { shippingMethod } });
  };

  // 4. Save payment methode
  const handleSavePaymentMethod = (event) => {
    event.preventDefault();

    send({ type: "SUBMIT_PAYMENT_METHOD", data: { paymentMethod } });
  };

  return (
    <>
      {cartState && (
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

                const {
                  productName,
                  productprice,
                  isShipingRequired,
                } = product;

                return (
                  <div key={key}>
                    <h1>{key + 1}</h1>
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
      )}
      {addressState && (
        <main>
          <h1>Add address</h1>
          <form>
            <div>
              <label>Enter street</label>
              <input
                type="text"
                name="street"
                onChange={(event) =>
                  setAddressData({
                    ...addressData,
                    street: event.target.value,
                  })
                }
                value={addressData.street ?? ""}
              />
            </div>
            <div>
              <label>Enter city</label>
              <input
                type="text"
                name="city"
                onChange={(event) =>
                  setAddressData({
                    ...addressData,
                    city: event.target.value,
                  })
                }
                value={addressData.city ?? ""}
              />
            </div>
            <div>
              <label>Enter country</label>
              <input
                type="text"
                name="country"
                onChange={(event) =>
                  setAddressData({
                    ...addressData,
                    country: event.target.value,
                  })
                }
                value={addressData.country ?? ""}
              />
            </div>
            <button type="submit" onClick={handleSaveAddress}>
              Save address
            </button>
          </form>
          <button
            onClick={(event) => {
              event.preventDefault();
              send({ type: "CART_WITH_PRODUCTS" });
            }}
          >
            Add products
          </button>
        </main>
      )}

      {shippingState && (
        <main>
          <h1>Choose shipping method</h1>
          <form>
            <div>
              <label>Enter street</label>
              <select
                onChange={(event) => setShippingMethod(event.target.value)}
              >
                <option value="ENGLAND">England</option>
                <option value="ENGLAND_AND_USA">England and USA</option>
              </select>
            </div>
            <button type="submit" onClick={handleSaveShippingMethod}>
              Save method
            </button>
          </form>
          <button
            onClick={(event) => {
              event.preventDefault();
              send({ type: "ADD_ADDRESS" });
            }}
          >
            Edit address
          </button>
        </main>
      )}

      {paymentState && (
        <main>
          <h1>Choose payment method</h1>
          <form>
            <div>
              <label>Choose one</label>
              <select
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="1ST_PAYMENT_METHOD">1st payment method</option>
                <option value="2ND_PAYMENT_METHOD">2nd payment method</option>
                <option value="3RD_PAYMENT_METHOD">3rd payment method</option>
              </select>
            </div>
            <button type="submit" onClick={handleSavePaymentMethod}>
              Save payment method
            </button>
          </form>
          <button
            onClick={(event) => {
              event.preventDefault();
              send({ type: "EDIT_SHIPPING_METHOD" });
            }}
          >
            Edit shipping method
          </button>
        </main>
      )}

      {summaryState && (
        <main>
          <div>
            <h1>1. Cart</h1>
            <div>
              <h1>Products in carts</h1>
              {currentCart.context.allProducts.length > 0 &&
                currentCart.context.allProducts.map((product, key) => {
                  if (!product) {
                    return;
                  }

                  const {
                    productName,
                    productprice,
                    isShipingRequired,
                  } = product;

                  return (
                    <div key={key}>
                      <h1>{key + 1}</h1>
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
          </div>

          <div>
            <h1>2. Address</h1>
            <div>
              <h3>Street: {addressData.street}</h3>
              <h3>City: {addressData.city}</h3>
              <h3>Country: {addressData.country}</h3>
            </div>
          </div>

          <div>
            <h1>3. Shipping Method</h1>
            <div>
              <h3>Method: {shippingMethod}</h3>
            </div>
          </div>

          <div>
            <h1>4. Payment Method</h1>
            <div>
              <h3>Payment: {paymentMethod}</h3>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
