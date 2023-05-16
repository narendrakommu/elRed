import { Table } from "antd"
import { orderListDatasource, orderListcolumns } from "../../../constants"


export const TableList = ({ list, handleDeleteorderItem = () => { }, isCart, handleOrderList, setDrawerOpen }) => {
    return (
        <Table
            columns={
                orderListcolumns({ isCart, handleOrderList, list, setDrawerOpen })
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