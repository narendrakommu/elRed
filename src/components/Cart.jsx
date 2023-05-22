import { Layout, Row, Col, Divider, Space, Button, Typography, message } from "antd";
import { TableList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { handleAddToOrderList, handleCart, handleClearOrderList } from "../redux/shopListSlice";

const { Title } = Typography;
const { Sider } = Layout;

const Cart = ({ }) => {
    const cart = useSelector(state => state.shopList.cart);
    const dispatch = useDispatch();
    const totalGross = cart.reduce((acc, curr) => acc + parseInt(curr.grossPrice), 0);
    const taxableAmnt = Math.floor(0.27 * totalGross);
    const tax = Math.floor(0.09 * totalGross);

    const success = () => {
        message.success({
            duration: 5,
            content: <div>your order is placed succsessfully</div>
        })
    };

    const onClearCart = () => {
        dispatch(handleCart({ type: 'clearAll' }));
    }

    const handlePlaceOrder = () => {
        onClearCart();
        dispatch(handleClearOrderList());
    }

    return (
        <Sider className="main-content-layout-sidebar">
            <TableList list={cart} isCart={true} />
            {cart.length > 0 && <div className="cart-price-details">
                {['items total', 'SGST(9%)', 'CGST(9%)', 'IGST(9%)', 'Taxable Amnt'].map(ele => <Row className="row-child">
                    <Col className='column-header' span={18}>{ele}</Col>
                    <Col className='column-value' span={6}>
                        <span>{ele === 'items total' ? totalGross : (ele === 'Taxable Amnt' ? taxableAmnt : tax)}</span>
                    </Col>
                </Row>)}
                <Divider className="line-breaker" />
                <div className="cart-footer">
                    <Row className="row-child">
                        <Col className='column-header' span={18}><Title style={{ margin: 0 }} level={4}>Order Total</Title></Col>
                        <Col className='column-value' span={6}>
                            {totalGross + taxableAmnt}
                        </Col>
                    </Row>
                    <Space style={{ justifyContent: 'center', display: 'flex' }}>
                        <Button onClick={() => { onClearCart(); }}>Clear Cart</Button>
                        <Button onClick={() => { handlePlaceOrder(); success(); }}>Place Order</Button>
                    </Space>
                </div>
            </div>}
        </Sider>
    );
};

export { Cart };