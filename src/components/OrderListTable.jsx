import { Button, Table, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TableList } from "../components";

const { Text, Title } = Typography;

const OrderListTable = ({ orderList = [], handleDeleteorderItem, handleOrderList, handleCart, onDrawerClose }) => {

    return (
        <div className="variant-table-wrap">
            <div className="table-heading">
                <Title style={{ margin: 0 }} level={3}>Order List</Title>
                <CloseOutlined onClick={() => { onDrawerClose() }} />
            </div>
            <TableList list={orderList} handleDeleteorderItem={handleDeleteorderItem} />
            <Button disabled={!orderList.length} className="add-cart" type="primary" onClick={() => { handleCart({ data: orderList }); handleOrderList({ data: null, isClearAll: true }); onDrawerClose(true); }}>Add to cart</Button>
        </div>
    );
}

export { OrderListTable };