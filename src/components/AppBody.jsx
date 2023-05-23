import { Layout } from 'antd';
import { ContentSidebar, ContentFooter, ContentBody, Cart, ProductDrawer } from '../components';
import { useSelector } from 'react-redux'

const AppBody = ({ }) => {
    const selectedSubCategoryId = useSelector((state) => state.shopList.selectedSubCategoryId);
    // const isDrawerOpen = useSelector((state) => state.shopList.isDrawerOpen);

    return <Layout className='main-content-layout'>
        <Layout>
            <Layout>
                <ContentSidebar />
                <ContentBody />
            </Layout>
            {selectedSubCategoryId && <ContentFooter />}
        </Layout>
        <Cart />
        <ProductDrawer />
    </Layout>
}

export { AppBody };