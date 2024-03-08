import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import dataReducer from './proudctDataSlice';

// const store = configureStore({
//   reducer: {
//     data: dataReducer,  
//   },

// });

const reducer = combineReducers({
  Data: dataReducer,
})

const persistConfig = {
  key:'Data',
  storage,
  whiteList:[],
  blackList:[]
}

const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
})

export const persistor = persistStore(store)
export default store;