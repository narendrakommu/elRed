import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    selectedCategoryId: '',
    subCategories: {},
    selectedSubCategoryId: '',
    products: {},
    selectedProductId: '',
    cart: [],
    orderList: [],
    isDrawerOpen: false
}

const shopListSlice = createSlice({
    name: 'shopList',
    initialState,
    reducers: {
        handleCategories: (state, action) => {
            state.categories = action.payload;
        },
        handleSelectedCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload;
        },
        handleSubCategories: (state, action) => {
            const {categoryId, subCategories} = action.payload;
            state.subCategories = {...state.subCategories, [categoryId]: subCategories}
        },
        handleSelectedSubCategoryId: (state, action) => {
            state.selectedSubCategoryId = action.payload;
        },
        handleProducts: (state, action) => {
            const {subCategoryId, products} = action.payload;
            state.products = {...state.products, [subCategoryId]: products};
        },
        handleClearProducts: (state) => {
            state.products = {};
        },
        handleSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
        },
        handleCart: (state, action) => {
            const {type, data} = action.payload;
            if(type === 'clearAll') {
                state.cart = [];
            } else if(type === 'add') {
                if (state.cart.length) {
                    let newList = [...state.cart];
                    data.forEach(dataItem => {
                        let isDataItemExist = false;
                        newList = state.cart.map(cartItem => {
                            if (cartItem.variantId === dataItem.variantId) {
                                isDataItemExist = true;
                                return { ...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(dataItem.quantity), grossPrice: parseInt(cartItem.grossPrice) + parseInt(dataItem.grossPrice) };
                            } else {
                                return cartItem;
                            }
                        })
                        !isDataItemExist && newList.push(dataItem);
                    })
                    state.cart = newList;
                } else {
                    state.cart = data;
                }
            }
        },
        handleAddToOrderList: (state, action) => {
            let {isEdit, list} = action.payload;
            let isItemExist = false;
            if(isEdit) {
                state.orderList = list;
            } else {
                let newList = state.orderList.map(order => {
                    if (order.variantId === action.payload.variantId) {
                        isItemExist = true;
                        return { ...order, quantity: parseInt(action.payload.quantity), grossPrice: parseInt(action.payload.grossPrice) }
                    }
                    return order;
                })
                if(isItemExist) {
                    state.orderList = newList;
                } else {
                    state.orderList = [...state.orderList, action.payload];
                }
            }
        },
        handleOrderDelete: (state, action) => {
            state.orderList = state.orderList.filter(ele => ele.variantId !== action.payload);
        },
        handleDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
    }
})

export const { handleCategories, handleSubCategories, handleProducts, handleSelectedCategoryId, handleSelectedSubCategoryId, handleSelectedProductId, handleCart, handleAddToOrderList, handleOrderDelete, handleDrawerOpen, handleClearProducts } = shopListSlice.actions;

export default shopListSlice.reducer;