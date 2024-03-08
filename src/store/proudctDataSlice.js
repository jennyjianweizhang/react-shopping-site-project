import { createSlice } from '@reduxjs/toolkit';
import  app  from '../service/config'
import { collection, getDocs, getFirestore } from "firebase/firestore";


export const dataSlice = createSlice({
  name: 'Data',
  initialState: {
    products: [],
    error: null,
    user: null,
    items: [],
    isCartVisible: false,
    searchTerm:'',
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
      console.log(action);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    addToCart: (state, action)=> {
      // state.items.push(action.payload) 

      // extract properties from the new product that is being added to the cart.
      const { product, selectedSize, selectedColor } = action.payload;
      const existingItem = state.items.find(item =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
  
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          state.items.push({ ...action.payload, quantity: 1 });
          // action.payload: the object contains the product details sent with the action.
      }
      console.log("Cart Items:", state.items);
      console.log("Action payload:", action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => {
        if (item.product.id !== action.payload.id){
          return true;
        }
        else {
          return item.selectedSize !== action.payload.selectedSize || item.selectedColor !== action.payload.selectedColor;
        }
       }  
      );
      console.log('Removing from cart:', action.payload);
  },
    showCart: (state) => {
      state.isCartVisible = true;
    },
    hideCart: (state) => {
      state.isCartVisible = false;
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action) => {
      const {id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(item =>
          item.product.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (item) {
          item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(item =>
        item.product.id === id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );
    if (item && item.quantity > 1) {
      item.quantity -= 1;
     }
    },
    // removes an item if any of its properties differ from the ones in action.payload
    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

//  dispatch the setUser action in component page, passing the userProfile as the payload. Updates the Redux store with the user's information.
// Immer produces an entirely new state object with changes. when modifying an array, use array methods 

export const { addProduct, setError, setUser, clearUser, addToCart, showCart, hideCart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart, setSearchTerm} = dataSlice.actions;
const dataReducer = dataSlice.reducer;
export default dataReducer;

// export const fetchData = () => () => {
//   const db = getFirestore(app);
//   return async (dispatch) =>{
//     try {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       let arr = [];
//       querySnapshot.forEach((doc) => {
//         arr.push(doc.data());
//       });
//       dispatch(addProduct(arr));
//     } catch (error) {
//       dispatch(setError(error));
//     }
//   }

// };

const db = getFirestore(app);
const fetchData=()=>{
  return async (dispatch) =>{
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch(addProduct(arr));
    } catch (error) {
      dispatch(setError(error));
    }
  }
}
export{fetchData}
