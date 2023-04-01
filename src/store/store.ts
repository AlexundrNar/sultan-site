import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/CartSlice";
import adminSlice from "./reducers/AdminSlice";

const rootReducer = combineReducers({
  cartSlice,
  adminSlice
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']