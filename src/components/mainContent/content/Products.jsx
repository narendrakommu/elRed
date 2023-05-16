import { useState } from "react";
import { CategoryCard } from "../../CategoryCard"
import { COLORDESCRIPTION, PRODUCT } from "./ContentBody"
import { ProductDrawer } from "./ProductDrawer";

export const Products = ({ handleOrderList, orderList, subCategoryProducts, handleSelectedItem, selectedProduct, handleCart, handleDeleteorderItem, isEditOrders, onDrawerClose, drawerOpen, setDrawerOpen }) => {

    return <div className="products">
        {subCategoryProducts.length ? subCategoryProducts.map((product) => (
            <CategoryCard
                callBack={() => { setDrawerOpen(true) }}
                handleSelectedItem={handleSelectedItem}
                key={product.productId}
                id={product.productId}
                imageUrl={product.productImages.find(ele => ele)}
                name={product.itemDescription}
                type={PRODUCT}
                subText='Best household product interms of quality and life validity'
                customClass={['card-top-60']}
                drawerOpen={drawerOpen}
                item={product}
            />
        )) : <p>There are no products for this sub category</p>}
        {drawerOpen && <ProductDrawer isEditOrders={isEditOrders} handleDeleteorderItem={handleDeleteorderItem} orderList={orderList} handleOrderList={handleOrderList} handleCart={handleCart} drawerOpen={drawerOpen} onDrawerClose={onDrawerClose} selectedProduct={selectedProduct} />}
    </div>
}