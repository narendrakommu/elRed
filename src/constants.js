import { Typography, Tooltip, Image } from "antd";
import {
    MinusCircleOutlined, EditOutlined
} from "@ant-design/icons";

const { Paragraph, Text, Title } = Typography;

export const orderListcolumns = ({ isCart, handleOrderList, list, setDrawerOpen=()=> {} }) => {
    let columnsData = [ ];
	[ 'Products', 'Quantity', 'Price' ].forEach((ele) => {
		columnsData.push({
			title: () => <Tooltip mouseEnterDelay={0.7} title={ele}>{(ele === 'Price') && isCart ? <>{ele}{<EditOutlined className='edit-icon' onClick={() => {handleOrderList({data: list, isEdit: true})}}/>}</> : ele}</Tooltip>,
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
                                width={25}
                                height={25}
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

export const orderListDatasource = ({list=[], handleDeleteorderItem, isCart}) => {
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
                            handleDeleteorderItem(variantId);
                        }}
                    />
                </div>
        }
        return item;
})
};