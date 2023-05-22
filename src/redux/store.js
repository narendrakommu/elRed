import { configureStore } from '@reduxjs/toolkit'
import shopListReducer from './shopListSlice';

const store = configureStore({
  reducer: {
    shopList: shopListReducer
  },
})

export default store;