import { Typography, Tooltip, Image } from "antd";
import { MinusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { handleDrawerOpen, handleOrderDelete, handleCartEdit, handleVariantIdToBeReplaced, handleSelectedCategoryId, handleSelectedSubCategoryId, handleSelectedProductId, handleReplaceOrderList, handleOrderItemSelected } from "./redux/shopListSlice";

const { Paragraph, Text } = Typography;

const handleOnEditClick = ({dispatch, list}) => {
    dispatch(handleDrawerOpen(true));
    dispatch(handleReplaceOrderList(list));
    dispatch(handleCartEdit(true));
}

const handleOnTableItemClick = ({dispatch, record}) => {
    const {variantId, categoryId, subCategoryId, productId} = record;
    dispatch(handleOrderItemSelected({variantId, categoryId, subCategoryId, productId}));
}

export const orderListcolumns = ({ isCart, list=[], dispatch, isCartEdit }) => {
    let columnsData = [ ];
	[ 'Products', 'Quantity', 'Price' ].forEach((ele) => {
		columnsData.push({
			title: () => <Tooltip mouseEnterDelay={0.7} title={ele}>{(ele === 'Price') && isCart && list.length ? <div className="price-title-wrap">{ele}{<EditOutlined className='edit-icon' onClick={() => {
                handleOnEditClick({dispatch, list});
            }}/>}</div> : ele}</Tooltip>,
			dataIndex: ele,
			key: ele,
			className: 'order-list-table-ellipsis',
			render: (name, record) => {
                if(ele === 'Products') {
                    return (
                        <div className="product-cell">
                            <Image
                                className={`product-logo ${!isCartEdit || 'cursor-pointer'}`}
                                preview={false}
                                src={record.imageUrl}
                                onClick={() => { isCartEdit && handleOnTableItemClick({dispatch, record})}}
                            />
                            <div className="product-text">
                                <Paragraph style={{width:70, margin:0}} ellipsis={{
                                        tooltip: name,
                                        rows: 1,
                                    }}>
                                        {name}
                                    </Paragraph>
                                <Paragraph style={{width:70, margin:0}} ellipsis={{
                                        tooltip: record.packingDescription,
                                        rows: 1,
                                    }}>{record.packingDescription}</Paragraph>
                            </div>
                        </div>
                    )
                }
                if(ele === 'Price') {
                    return <div className="price-cell">
                            <Text>{record.symbol}{name}</Text>
                            {!isCart && <Text>{record.actions}</Text>}
                        </div>
                }
                if(ele === 'Quantity') {
                    return (
                        <Text className="quantity-cell">
                            {name}
                        </Text>
                    );
                }
			}
		});
	});
	return columnsData;
};

const handleOrderItemRemove = ({dispatch, variantId}) => {
   dispatch(handleOrderDelete(variantId))
}

export const orderListDatasource = ({list=[], dispatch, isCart}) => {
    return list.map(ele => {
        const {
            productName, 
            packingDescription,
            colorDescription,
            variantId,
            productId, 
            quantity, 
            grossPrice,
            symbol,
            imageUrl,
            categoryId,
            subCategoryId
        } = ele;
        let item = {
            Products: productName, 
            Quantity: quantity,
            Price: grossPrice,
            packingDescription,
            colorDescription,
            variantId,
            productId,
            symbol,
            imageUrl,
            categoryId,
            subCategoryId
        }
        if(!isCart) {
            item.actions = <div className="table-actions">
                    <MinusCircleOutlined
                        className="table-action"
                        onClick={() => {
                            handleOrderItemRemove({dispatch, variantId});
                        }}
                    />
                </div>
        }
        return item;
    })
};
