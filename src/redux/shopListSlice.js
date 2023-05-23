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
    isDrawerOpen: false,
    isCartEdit: false,
    variantIdToBeReplaced: '',
}

const shopListSlice = createSlice({
    name: 'shopList',
    initialState,
    reducers: {
        handleCategories: (state, action) => {
            state.categories = action.payload;
        },
        handleCartEdit: (state, action) => {
            state.isCartEdit = action.payload;
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
        handleVariantIdToBeReplaced: (state, action) => {
            state.variantIdToBeReplaced = action.payload;
        },
        handleOrderItemSelected: (state, action) => {
            const {productId, variantId, subCategoryId, categoryId} = action.payload;
            state.variantIdToBeReplaced = variantId;
            state.selectedProductId = productId;
            state.selectedSubCategoryId = subCategoryId;
            state.selectedCategoryId = categoryId;
        },
        handleCart: (state, action) => {
            const {type, data} = action.payload;
            if(type === 'clearAll') {
                state.cart = [];
            } else {
                state.cart = data;
            }
            // else if(type === 'add') {
            //     if (state.cart.length) {
            //         let newList = [...state.cart];
            //         data.forEach(dataItem => {
            //             let isDataItemExist = false;
            //             newList = state.cart.map(cartItem => {
            //                 if (cartItem.variantId === dataItem.variantId) {
            //                     isDataItemExist = true;
            //                     return { ...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(dataItem.quantity), grossPrice: parseInt(cartItem.grossPrice) + parseInt(dataItem.grossPrice) };
            //                 } else {
            //                     return cartItem;
            //                 }
            //             })
            //             !isDataItemExist && newList.push(dataItem);
            //         })
            //         state.cart = newList;
            //     } 
                
            // }
        },
        handleReplaceOrderList: (state, action) => {
            state.orderList = action.payload;
        },
        handleAddToOrderList: (state, action) => {
            if(state.variantIdToBeReplaced) {
                state.orderList = state.orderList.map(ele => {
                    if(ele.variantId === state.variantIdToBeReplaced) {
                        ele = action.payload;
                    }
                    return ele;
                })
                state.variantIdToBeReplaced = '';
            } else {
                let isItemExist = false;
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
        handleClearOrderList: (state) => {
            state.orderList = [];
        },
        handleOrderDelete: (state, action) => {
            state.orderList = state.orderList.filter(ele => ele.variantId !== action.payload);
            if(action.payload === state.variantIdToBeReplaced) {
                state.variantIdToBeReplaced = '';
            }
        },
        handleDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
    }
})

export const { handleCategories, handleSubCategories, handleProducts, handleSelectedCategoryId, handleSelectedSubCategoryId, handleSelectedProductId, handleCart, handleAddToOrderList, handleOrderDelete, handleDrawerOpen, handleClearProducts, handleClearOrderList, handleCartEdit, handleVariantIdToBeReplaced, handleReplaceOrderList, handleOrderItemSelected } = shopListSlice.actions;

export default shopListSlice.reducer;