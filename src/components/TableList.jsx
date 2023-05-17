import { Table } from "antd"
import { orderListDatasource, orderListcolumns } from "../helperMethods"


const TableList = ({ list, handleDeleteorderItem = () => { }, isCart, handleOrderList }) => {
    return (
        <Table
            columns={
                orderListcolumns({ isCart, handleOrderList, list })
            }
            pagination={false}
            bordered
            rowKey={(record) => record.key}
            className={`orderList-table ${isCart ? 'td-padding-5-20' : ''}`}
            tableLayout="fixed"
            dataSource={[...orderListDatasource({ list, handleDeleteorderItem, isCart })]}
        />
    )
}

export { TableList };