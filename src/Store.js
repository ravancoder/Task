import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slices/ProductSlice";
const Store = configureStore({
    reducer : {
    Product: ProductReducer
    }

});

export default Store;