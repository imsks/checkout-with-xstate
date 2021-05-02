import { Machine, assign } from "xstate";

export const cartMachine = Machine({
  id: "cart",
  initial: "cart_no_products",
  context: {
    allProducts: [],
    address: {},
    shippingMethod: "",
    paymentMethod: "",
  },
  states: {
    cart_no_products: {
      on: {
        ADD_PRODUCT: {
          target: "carts_with_products",
          cond: (context, event) =>
            event.data.productName != null &&
            event.data.productprice != null &&
            event.data.isShipingRequired != null,
        },
      },
    },

    carts_with_products: {
      entry: assign({
        allProducts: (context, event) => [...context.allProducts, event.data],
      }),

      on: {
        ADD_PRODUCT: "carts_with_products",
        ADD_ADDRESS: "add_address",
      },
    },

    add_address: {
      on: {
        SUBMIT_ADDRESS: {
          target: "shipping",
          actions: assign({
            address: (context, event) => event.data,
          }),
          cond: (context, event) =>
            event.data.street != null &&
            event.data.city != null &&
            event.data.country != null,
        },
        CART_WITH_PRODUCTS: "carts_with_products",
      },
    },

    shipping: {
      on: {
        ADD_ADDRESS: {
          target: "add_address",
        },

        SUBMIT_SHIPPING_METHOD: {
          target: "payment",
          actions: assign({
            shippingMethod: (context, event) => event.data,
          }),
          // cond: (context, event) => console.log(context),
        },
      },
    },

    payment: {
      on: {
        EDIT_SHIPPING_METHOD: {
          target: "shipping",
        },

        SUBMIT_PAYMENT_METHOD: {
          target: "summary",
          actions: assign({
            paymentMethod: (context, event) => event.data,
          }),
          // cond: (context, event) => console.log(context),
        },
      },
    },

    summary: {},
  },
});
