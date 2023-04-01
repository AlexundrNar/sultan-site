import { createSlice } from "@reduxjs/toolkit";
import { IGood } from "../../models/model";

// interface ICart {
//   cartItems: IGood[],
//   totalQuantity: number,
//   totalAmount: number,
// }

const initialState: any = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item: IGood) => item.barcode === newItem.barcode
      );
      
      if (!existingItem) {
        state.cartItems.push({
          barcode: newItem.barcode,
          url: newItem.url,
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          size: newItem.size,
          sizeType: newItem.sizeType,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity
        existingItem.price = newItem.price
      }

      state.totalQuantity = state.cartItems.reduce(
        (total: number, item: IGood) => total + Number(item.quantity), 0
      );
      state.totalAmount = state.cartItems.reduce(
        (total: number, item: IGood) => total + item.price * Number(item.quantity), 0
      );
    },

    plusItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item: IGood) => item.barcode === id);

      existingItem.quantity++
      state.totalQuantity++;
      state.totalAmount = state.cartItems.reduce(
        (total: number, item: IGood) => total + item.price * Number(item.quantity), 0
      );
    },

    minusItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item: IGood) => item.barcode === id);

      if (existingItem.quantity !== 1) {
        existingItem.quantity--
        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce(
          (total: number, item: IGood) => total + item.price * Number(item.quantity), 0
        );
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item: IGood) => item.barcode === id);
  
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item: IGood) => item.barcode !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total: number, item: IGood) => total + item.price * Number(item.quantity), 0
      );
    },

    clearCart: (state) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalAmount = 0
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;