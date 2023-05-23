import { Table } from "antd"
import { orderListDatasource, orderListcolumns } from "../helperMethods"
import { useDispatch, useSelector } from "react-redux";


const TableList = ({ list, isCart }) => {
    const dispatch = useDispatch();
    const isCartEdit = useSelector(state => state.shopList.isCartEdit);

    return (
        <Table
            columns={
                orderListcolumns({ isCart, list, dispatch, isCartEdit })
            }
            pagination={false}
            bordered
            rowKey={(record) => record.key}
            className={`orderList-table ${isCart ? 'td-padding-5-20' : ''}`}
            tableLayout="fixed"
            dataSource={[...orderListDatasource({ list, dispatch, isCart })]}
        />
    )
}

export { TableList };