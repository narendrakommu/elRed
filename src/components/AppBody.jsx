import { Layout } from 'antd';
import { ContentSidebar, ContentFooter, ContentBody, Cart, ProductDrawer } from '../components';
import { useEffect, useState } from 'react';
import { CATEGORY, PRODUCT, SUBCATEGORY, categoriesUrl } from '../constants';

const AppBody = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [subCategories, setSubCategories] = useState(undefined);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
    const [subCategoryProducts, setSubCategoryProducts] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [cart, setCart] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [isEditOrders, setIsEditOrders] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const onDrawerClose = (isAddToCart) => {
        setDrawerOpen(false);
        !isAddToCart && setIsEditOrders(false);
    };

    const handleOrderList = ({ data, isClearAll, isEdit }) => {
        if (isEdit) {
            setIsEditOrders(true);
            setDrawerOpen(true)
            setOrderList(data);
            return;
        }
        if (isClearAll) {
            setOrderList([]);
            return
        }
        let isItemExist = false;
        let newList = orderList.map(order => {
            if (order.variantId === data.variantId) {
                isItemExist = true;
                return { ...order, quantity: parseInt(order.quantity) + parseInt(data.quantity), grossPrice: parseInt(order.grossPrice) + parseInt(data.grossPrice) }
            }
            return order;
        })
        !isItemExist && newList.push(data);
        setOrderList(newList);
    }
    const handleDeleteorderItem = (id) => {
        setOrderList(prev => prev.filter(ele => ele.variantId !== id));
    }

    const handleSubCategories = (data) => {
        setSubCategories(data);
    }

    const handleSelectedSubCategoryId = (data) => {
        setSelectedSubCategoryId(data);
    }

    const handleSubCategoryProducts = (data) => {
        setSubCategoryProducts(data);
    }

    const handleSelectedProduct = (data) => {
        setSelectedProduct(data);
    }
    const handleCart = ({ data = [], clearAll }) => {
        if (clearAll) {
            setCart([]);
        } else {
            if (isEditOrders) {
                setCart(data);
                setIsEditOrders(false);
            } else {
                if (cart.length && data.length) {
                    let newList = [...cart];
                    data.forEach(dataItem => {
                        let isDataItemExist = false;
                        newList = newList.map(cartItem => {
                            if (cartItem.variantId === dataItem.variantId) {
                                isDataItemExist = true;
                                return { ...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(dataItem.quantity), grossPrice: parseInt(cartItem.grossPrice) + parseInt(dataItem.grossPrice) };
                            } else {
                                return cartItem;
                            }
                        })
                        !isDataItemExist && newList.push(dataItem);
                    })
                    setCart(newList);
                } else {
                    setCart([...cart, ...data])
                }
            }

        }
    }

    const handleSelectedItem = ({ id, type, item }) => {
        if (type === CATEGORY) {
            setSelectedCategoryId(id);
        } else if (type === SUBCATEGORY) {
            setSelectedSubCategoryId(id);
        } else if (type === PRODUCT) {
            setSelectedProduct(item);
        }
    }

    useEffect(() => {
        fetch(categoriesUrl)
            .then((res) => res.json())
            .then((res) => {
                setCategories(res.result);
            });
    }, []);

    useEffect(() => {
        selectedCategoryId &&
            fetch(
                `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${selectedCategoryId}.json`
            )
                .then((res) => res.json())
                .then((res) => {
                    setSubCategories(res.result);
                });
    }, [selectedCategoryId]);

    useEffect(() => {
        selectedSubCategoryId && fetch(
            `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${selectedSubCategoryId}.json`
        )
            .then((res) => res.json())
            .then((res) => {
                setSubCategoryProducts(res.result);
            });
    }, [selectedSubCategoryId])

    return <Layout className='main-content-layout'>
        <Layout>
            <Layout>
                <ContentSidebar />
                <ContentBody handleOrderList={handleOrderList} orderList={orderList} handleCart={handleCart} handleSubCategoryProducts={handleSubCategoryProducts} subCategoryProducts={subCategoryProducts} subCategories={subCategories} handleSubCategories={handleSubCategories} handleSelectedSubCategoryId={handleSelectedSubCategoryId} handleSelectedItem={handleSelectedItem} categories={categories} selectedCategoryId={selectedCategoryId} selectedProduct={selectedProduct} handleSelectedProduct={handleSelectedProduct} handleDeleteorderItem={handleDeleteorderItem} isEditOrders={isEditOrders} setIsEditOrders={setIsEditOrders} drawerOpen={drawerOpen} onDrawerClose={onDrawerClose} setDrawerOpen={setDrawerOpen} />
            </Layout>
            {subCategoryProducts && <ContentFooter selectedSubCategoryId={selectedSubCategoryId} subCategories={subCategories} handleSelectedItem={handleSelectedItem} handleSubCategoryProducts={handleSubCategoryProducts} handleSelectedSubCategoryId={handleSelectedSubCategoryId} />}
        </Layout>
        <Cart cart={cart} handleCart={handleCart} handleOrderList={handleOrderList} />
        {drawerOpen && <ProductDrawer isEditOrders={isEditOrders} handleDeleteorderItem={handleDeleteorderItem} orderList={orderList} handleOrderList={handleOrderList} handleCart={handleCart} drawerOpen={drawerOpen} onDrawerClose={onDrawerClose} selectedProduct={selectedProduct} />}
    </Layout>
}

export { AppBody };