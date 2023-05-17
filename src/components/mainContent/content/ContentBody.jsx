import { Input, Typography, Layout } from "antd";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import CategoriesAndSubCategories from "./CategoriesAndSubCategories";
import Products from "./Products";

const { Content } = Layout;
const { Title } = Typography;

const ContentBody = ({ orderList, handleOrderList, handleSubCategoryProducts, subCategoryProducts, subCategories, handleSelectedSubCategoryId, handleSelectedItem, categories, selectedCategoryId, selectedProduct, handleSelectedProduct, handleCart, handleDeleteorderItem, isEditOrders, setIsEditOrders, onDrawerClose, drawerOpen, setDrawerOpen }) => {

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

export default ContentBody;