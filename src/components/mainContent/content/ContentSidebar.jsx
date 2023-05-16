import { Menu, Layout, Image } from "antd";
import {
    AppstoreOutlined,
    DashboardOutlined,
    BorderOuterOutlined,
    HeartOutlined,
    TagsOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

function getItem(label, key, icon, disabled) {
    return {
        key,
        icon,
        label,
        disabled
    };
}

const items = [
    getItem("Dashboard", "1", <DashboardOutlined />, true),
    getItem("All Products", "2", <AppstoreOutlined />),
    getItem("Orders", "3", <BorderOuterOutlined />, true),
    getItem("Favorities", "4", <HeartOutlined />, true),
    getItem("New Arrival", "5", <TagsOutlined />, true)
];

export const ContentSidebar = () => {
    return (
        <Sider className="content-sidebar">
            <Image
                className="sidebar-compny-logo"
                preview={false}
                width={40}
                height={40}
                src="https://images.template.net/wp-content/uploads/2017/04/Abstract-Logo-with-Colorful-Leaves1.jpg"
                alt="Company logo"
            />
            <Menu
                defaultSelectedKeys={["2"]}
                mode="inline"
                theme="light"
                items={items}
            />
        </Sider>
    );
};
