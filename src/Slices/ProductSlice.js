
import { createSlice } from "@reduxjs/toolkit";

const Products = [
    {id:1, name:"Bread", price:1.10},
    {id:2, name:"Milk",  price:0.50},
    {id:3, name:"Cheese",  price:0.90},  
    {id:4, name:"Soup",  price:0.60},    
    {id:5, name:"Butter",  price:1.20},    
];

const quantity = {}
Products.forEach(p =>{
    quantity[p.id] = 0;
});
 


const initialState = {
  Products: Products,
  Quantity: quantity
}

const ProductSlice = createSlice({
   name : "cart",
   initialState,
   reducers: {
    addProducts(state,action)  {
       const id = action.payload;
        state.Quantity[id] = state.Quantity[id] + 1;
        console.log(state.Quantity[id],id);
    },
    removeProducts(state,action) {
       const id = action.payload;
       state.Quantity[id] = state.Quantity[id] - 1;
         console.log(state.Quantity[id],id);
    }
    
   }
});
export const {addProducts,removeProducts} = ProductSlice.actions
export default ProductSlice.reducer;