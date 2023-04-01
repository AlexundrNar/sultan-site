import { createSlice } from "@reduxjs/toolkit";
import { IGood } from "../../models/model";
import data from "../../bd.json"

interface IAdmin {
  adminItems: IGood[],
}

const initialState: IAdmin = {
  adminItems: data,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeData: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.adminItems.find(
        (item: IGood) => item.barcode === Number(newItem.barcode)
      );

      if (!existingItem) {
        state.adminItems.push({
          name: newItem.name,
          description: newItem.description,
          sizeType: newItem.sizeType,
          size: newItem.size,
          barcode: newItem.barcode,
          maker: newItem.maker,
          brend: newItem.brend,
          price: newItem.price,
          url: newItem.url,
          caretype: newItem.caretype
        });
      } else {
        existingItem.name = newItem.name
        existingItem.description = newItem.description
        existingItem.sizeType = newItem.sizeType
        existingItem.size = newItem.size
        existingItem.barcode = newItem.barcode
        existingItem.maker = newItem.maker
        existingItem.brend = newItem.brend
        existingItem.price = newItem.price
        existingItem.url = newItem.url
        existingItem.caretype = newItem.caretype
      }

      localStorage.setItem('adminItems', JSON.stringify(state.adminItems.map((item: IGood) => item)))
      console.log(localStorage.adminItems);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.adminItems.find((item: IGood) => item.barcode === id);
  
      if (existingItem) {
        state.adminItems = state.adminItems.filter((item: IGood) => item.barcode !== id);
      }
      if (state.adminItems.length === 0) {
        state.adminItems = data
      }

      localStorage.setItem('adminItems', JSON.stringify(state.adminItems.map((item: IGood) => item)))
      console.log(localStorage.adminItems);
    },
  }
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;