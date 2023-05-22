import { Typography, Tooltip, Image } from "antd";
import {
    MinusCircleOutlined, EditOutlined
} from "@ant-design/icons";
import { handleDrawerOpen, handleOrderDelete, handleAddToOrderList } from "./redux/shopListSlice";

const { Paragraph, Text } = Typography;

const handleOnEditClick = ({dispatch, list}) => {
    dispatch(handleDrawerOpen(true));
    dispatch(handleAddToOrderList({list, isEdit: true}));
}

export const orderListcolumns = ({ isCart, list=[], dispatch }) => {
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
                                className="product-logo"
                                preview={false}
                                src={record.imageUrl}
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
            imageUrl
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
            imageUrl
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
