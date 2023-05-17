import { Button, Card, Drawer, InputNumber, Space, Typography } from "antd"
import { useEffect, useState } from "react"
import { OrderListTable, CategoryCard } from "../components";
import { COLORDESCRIPTION, VARIANT } from "../constants";

const { Text, Title } = Typography;

const ProductDrawer = ({ handleOrderList, orderList, onDrawerClose, drawerOpen, selectedProduct = { variants: [] }, handleCart, handleDeleteorderItem }) => {
    const [variants, setVariants] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({ packingDescription: selectedProduct?.variants[0]?.packingDescription || '', colorDescription: selectedProduct?.variants[0]?.colorDescription || '' });
    const [quantity, setQuantity] = useState(20);

    const { grossPrice, saleDescription, bpCatalogNumber, variantId } = variants[`${selectedVariant.packingDescription}_${selectedVariant.colorDescription}`] || {};

    const handleVariantChange = ({ changeType, value }) => {
        if (changeType === COLORDESCRIPTION) {
            setSelectedVariant(prev => ({ ...prev, colorDescription: value }))
        } else {
            setSelectedVariant(prev => ({ ...prev, packingDescription: value }))
        }
    }
    useEffect(() => {
        if (Object.keys(variants).length && !variants[`${selectedVariant.packingDescription}_${selectedVariant.colorDescription}`]) {
            alert('This variant combination is out of stock. Please select another combo.')
        }
    }, [selectedVariant])

    useEffect(() => {
        let list = { itemDescription: selectedProduct?.itemDescription, currency: selectedProduct?.currency, productImages: selectedProduct?.productImages, productId: selectedProduct?.productId, packingDescriptionList: [], colorDescriptionList: [] };
        selectedProduct?.variants?.forEach(obj => {
            list[`${obj.packingDescription}_${obj.colorDescription}`] = { ...obj };
            if (!list.packingDescriptionList.includes(obj.packingDescription)) {
                list.packingDescriptionList.push(obj.packingDescription);
            }
            if (!list.colorDescriptionList.includes(obj.colorDescription)) {
                list.colorDescriptionList.push(obj.colorDescription);
            }
        })
        setSelectedVariant({ packingDescription: selectedProduct?.variants[0]?.packingDescription || '', colorDescription: selectedProduct?.variants[0]?.colorDescription || '' })
        setVariants(list);
    }, [selectedProduct])

    const onChange = (value) => {
        setQuantity(value);
    };

    return <Drawer
        className="product-drawer"
        placement="right"
        // size={'large'}
        closable={false}
        onClose={onDrawerClose}
        open={drawerOpen}
    >   <div className="variant-info">
            <Title style={{
                marginTop: 0,
                alignSelf: "flex-start",
            }} level={3}>
                {variants.itemDescription}
            </Title>
            <CategoryCard
                customClass={["variant-card"]}
                handleVariantChange={handleVariantChange}
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
                    {variants.colorDescriptionList?.map(ele => <Button key={ele} onClick={() => { handleVariantChange({ changeType: COLORDESCRIPTION, value: ele }) }} className={`color-description-item ${ele === selectedVariant.colorDescription ? 'highlight' : ''}`}>{ele}</Button>)}
                </Space>
            </Card>
            <Card className="package-description-card" title="Please select Packaging Description">
                <Space className="package-description-space" wrap>
                    {variants.packingDescriptionList?.map(ele => <Button key={ele} onClick={() => { handleVariantChange({ value: ele }) }} className={`package-description-item ${ele === selectedVariant.packingDescription ? 'highlight' : ''}`} >{ele}</Button>)}
                </Space>
            </Card>
            <Card className="quantity-card" title="Enter Quantity">
                <InputNumber className="qunatity-number" value={quantity} min={12} max={100} defaultValue={20} onChange={onChange} />
                <Text className='quantity-warning'>*Minimum quantity should be 12</Text>
            </Card>
            <Button style={{ marginBottom: 25 }} disabled={!variants[`${selectedVariant.packingDescription}_${selectedVariant.colorDescription}`]} onClick={() => { handleOrderList({ data: { quantity, productName: variants.itemDescription, packingDescription: selectedVariant.packingDescription, colorDescription: selectedVariant.colorDescription, grossPrice: parseInt(quantity) * parseInt(grossPrice), variantId, productId: variants.productId, symbol: variants?.currency?.symbol, imageUrl: variants?.productImages?.find(ele => ele) } }) }}>Add</Button>
        </div>
        <OrderListTable handleOrderList={handleOrderList} orderList={orderList} handleDeleteorderItem={handleDeleteorderItem} handleCart={handleCart} onDrawerClose={onDrawerClose} />
    </Drawer>
}

export { ProductDrawer };