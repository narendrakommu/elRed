import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { TableList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { handleCart, handleCartEdit, handleDrawerOpen, handleVariantIdToBeReplaced } from "../redux/shopListSlice";

const { Title } = Typography;

const OrderListTable = ({ }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.shopList.orderList);
    // const isCartEdit = useSelector(state => state.shopList.isCartEdit);

    const handleOnAddToCart = () => {
        dispatch(handleDrawerOpen(false));
        dispatch(handleCart({ type: 'add', data: orderList }));
        dispatch(handleCartEdit(false));
    }

    const handleCloseDrawer = () => {
        dispatch(handleDrawerOpen(false));
        dispatch(handleCartEdit(false));
        dispatch(handleVariantIdToBeReplaced(''));
    }

    return (
        <div className="variant-table-wrap">
            <div className="table-heading">
                <Title style={{ margin: 0 }} level={3}>Order List</Title>
                <CloseOutlined onClick={handleCloseDrawer} />
            </div>
            <TableList list={orderList} />
            <Button disabled={!orderList.length} className="add-cart" type="primary" onClick={handleOnAddToCart}>Add to cart</Button>
        </div>
    );
}

export { OrderListTable };