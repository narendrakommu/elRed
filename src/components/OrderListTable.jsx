import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TableList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { handleCart, handleDrawerOpen } from "../redux/shopListSlice";

const { Title } = Typography;

const OrderListTable = ({ }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.shopList.orderList);
    const isCartEdit = useSelector(state => state.shopList.isCartEdit);

    return (
        <div className="variant-table-wrap">
            <div className="table-heading">
                <Title style={{ margin: 0 }} level={3}>Order List</Title>
                <CloseOutlined onClick={() => { dispatch(handleDrawerOpen(false)) }} />
            </div>
            <TableList list={orderList} />
            <Button disabled={!orderList.length || isCartEdit} className="add-cart" type="primary" onClick={() => { dispatch(handleDrawerOpen(false)); dispatch(handleCart({ type: 'add', data: orderList })) }}>Add to cart</Button>
        </div>
    );
}

export { OrderListTable };