import { Button, Card, Drawer, InputNumber, Space, Typography } from "antd"
import { useEffect, useState } from "react"
import { OrderListTable, CategoryCard } from "../components";
import { VARIANT, defaultImage } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToOrderList, handleVariantIdToBeReplaced } from "../redux/shopListSlice";
import { handleDrawerOpen } from "../redux/shopListSlice";

const { Text, Title } = Typography;

const ProductDrawer = ({ }) => {
    const selectedProductId = useSelector(state => state.shopList.selectedProductId);
    const selectedSubCategoryId = useSelector(state => state.shopList.selectedSubCategoryId);
    const isCartEdit = useSelector(state => state.shopList.isCartEdit);
    const isDrawerOpen = useSelector(state => state.shopList.isDrawerOpen);
    const variantIdToBeReplaced = useSelector(state => state.shopList.variantIdToBeReplaced);
    const orderList = useSelector(state => state.shopList.orderList);
    const products = useSelector(state => state.shopList.products);
    const [variants, setVariants] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({});
    const [quantity, setQuantity] = useState(20);
    const [isQunatityOutRange, setIsQunatityOutRange] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const dispatch = useDispatch();

    const { grossPrice, saleDescription, bpCatalogNumber, variantId, packingDescription, colorDescription } = selectedVariant || {};

    useEffect(() => {
        selectedProductId && setSelectedProduct(products[selectedSubCategoryId]?.find(ele => ele.productId === selectedProductId) || {})
    }, [selectedProductId])

    useEffect(() => {
        if (Object.keys(selectedProduct || {}).length) {
            let list = { productName: selectedProduct?.itemDescription, currency: selectedProduct?.currency, productImages: selectedProduct?.productImages, productId: selectedProduct?.productId, categoryId: selectedProduct.categoryId, subCategoryId: selectedProduct.subCategoryId, colorDescriptions: {} };
            selectedProduct?.variants?.forEach(variant => {
                if (list.colorDescriptions[variant.colorDescription]) {
                    list.colorDescriptions[variant.colorDescription].push({ ...variant });
                } else {
                    list.colorDescriptions[variant.colorDescription] = [{ ...variant }];
                }
            })
            setVariants(list);
            if (!isCartEdit) {
                setSelectedVariant((Object.values(list.colorDescriptions)[0] || [])[0]);
            }
        }
    }, [selectedProduct])

    const handleColorDescriptionChange = (color) => {
        setSelectedVariant(variants.colorDescriptions[color][0]);
    }
    const handlePackageDescriptionChange = ({ variantId, color }) => {
        setSelectedVariant(variants.colorDescriptions[color].find(ele => ele.variantId === variantId));
    }

    useEffect(() => {
        if (isCartEdit && Object.keys(variants).length && variantIdToBeReplaced) {
            let orderItem = orderList.find(ele => ele.variantId === variantIdToBeReplaced);
            let variantToBeReplaced = variants.colorDescriptions[orderItem.colorDescription].find(ele => ele.variantId === variantIdToBeReplaced)
            if (variantToBeReplaced) {
                setSelectedVariant(variantToBeReplaced);
                setQuantity(orderItem.quantity);
            }
        }
    }, [variants, variantIdToBeReplaced])

    const onChange = (value) => {
        if (value < 12) {
            setIsQunatityOutRange({ errorMessage: 'Minimum orders 12*' })
        } else if (value > 100) {
            setIsQunatityOutRange({ errorMessage: 'Maximum orders 100*' })
        } else {
            setIsQunatityOutRange(false)
        }
        setQuantity(value);
    };

    const handleOnAddToOrderList = () => {
        let data = { quantity, productName: variants.productName, packingDescription, colorDescription, grossPrice: parseInt(quantity) * parseInt(grossPrice), variantId, productId: variants.productId, symbol: variants?.currency?.symbol, imageUrl: variants?.productImages?.find(ele => ele) || defaultImage, categoryId: variants.categoryId, subCategoryId: variants.subCategoryId, };
        dispatch(handleAddToOrderList(data));
    }

    return <Drawer
        className="product-drawer"
        placement="right"
        closable={false}
        onClose={() => { dispatch(handleDrawerOpen(false)); dispatch(handleVariantIdToBeReplaced('')); }}
        open={isDrawerOpen}
    >   <div className="variant-info">
            <Title style={{
                marginTop: 0,
                alignSelf: "flex-start",
            }} level={3}>
                {variants.itemDescription}
            </Title>
            <CategoryCard
                customClass={["variant-card"]}
                selectedVariant={selectedVariant}
                variants={variants}
                key={variants?.productId}
                imageUrl={variants?.productImages?.find(ele => ele)}
                type={VARIANT}
                grossPrice={grossPrice}
                discription={saleDescription}
                bpCatalogNumber={bpCatalogNumber}
                variantId={variantId}
            />
            <Card className="color-description-card" title="Please select Color Description">
                <Space className="color-description-space" wrap>
                    {Object.keys(variants.colorDescriptions || {})?.map(ele => <Button key={ele} onClick={() => { handleColorDescriptionChange(ele) }} className={`color-description-item ${ele === selectedVariant.colorDescription ? 'highlight' : ''}`}>{ele}</Button>
                    )}
                </Space>
            </Card>
            <Card className="package-description-card" title="Please select Packaging Description">
                <Space className="package-description-space" wrap>
                    {Object.keys(variants.colorDescriptions || {}).length && variants.colorDescriptions[selectedVariant.colorDescription]?.map(ele => <Button key={ele.variantId} onClick={() => { handlePackageDescriptionChange({ variantId: ele.variantId, color: ele.colorDescription }) }} className={`package-description-item ${ele.variantId === selectedVariant.variantId ? 'highlight' : ''}`} >{ele.packingDescription}</Button>)}
                </Space>
            </Card>
            <Card className="quantity-card" title="Enter Quantity">
                <InputNumber className="qunatity-number" value={quantity} defaultValue={20} onChange={onChange} />
                {isQunatityOutRange && <Text className='quantity-warning'>{isQunatityOutRange.errorMessage}</Text>}
            </Card>
            <Button style={{ marginBottom: 25 }} disabled={isQunatityOutRange} onClick={handleOnAddToOrderList}>
                Add
            </Button>
        </div>
        <OrderListTable />
    </Drawer>
}

export { ProductDrawer };