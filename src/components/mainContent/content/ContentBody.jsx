import { Input, Typography, Layout } from "antd";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CategoriesAndSubCategories } from "./CategoriesAndSubCategories";
import { Products } from "./Products";

const { Content } = Layout;
const { Title } = Typography;

export const CATEGORY = 'CATEGORY';
export const SUBCATEGORY = 'SUBCATEGORY';
export const PRODUCT = 'PRODUCT';
export const VARIANT = 'VARIANT';
export const PACKINGDESCRIPTION = 'PACKINGDESCRIPTION';
export const COLORDESCRIPTION = 'COLORDESCRIPTION';

export const ContentBody = ({ orderList, handleOrderList, handleSubCategoryProducts, subCategoryProducts, subCategories, handleSelectedSubCategoryId, handleSelectedItem, categories, selectedCategoryId, selectedProduct, handleSelectedProduct, handleCart, handleDeleteorderItem, isEditOrders, setIsEditOrders, onDrawerClose, drawerOpen, setDrawerOpen }) => {

    return <Content className="content-body">
        <div className="content-header">
            <Title className="content-title" level={4}>
                {!subCategoryProducts ? 'Print Heads' : (<>
                    <ArrowLeftOutlined onClick={() => { handleSubCategoryProducts(null); handleSelectedSubCategoryId(''); }} className='product-arrow' />All Products
                </>)}
            </Title>
            <Input
                className="content-search"
                placeholder="Search..."
                prefix={<SearchOutlined />}
            />
        </div>
        {!subCategoryProducts ? (
            <CategoriesAndSubCategories categories={categories} handleSelectedItem={handleSelectedItem} subCategories={subCategories} selectedCategoryId={selectedCategoryId} />) : (<Products handleSelectedProduct={handleSelectedProduct} subCategoryProducts={subCategoryProducts} handleSelectedItem={handleSelectedItem} selectedProduct={selectedProduct} handleCart={handleCart} orderList={orderList} handleOrderList={handleOrderList} handleDeleteorderItem={handleDeleteorderItem} isEditOrders={isEditOrders} setIsEditOrders={setIsEditOrders} drawerOpen={drawerOpen} onDrawerClose={onDrawerClose} setDrawerOpen={setDrawerOpen} />)
        }
    </Content>
}