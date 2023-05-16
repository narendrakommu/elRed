import { Image, Input, Dropdown, Button, Space, Layout } from "antd";
import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const menuProps = {
    items: [
        {
            label: "coming soon...",
            key: "1"
        }
    ]
};

export const AppHeader = () => {
    return (
        <Header className="main-header">
            <Image
                className="compny-logo"
                preview={false}
                width={45}
                height={45}
                src="https://images.template.net/wp-content/uploads/2017/04/Abstract-Logo-with-Colorful-Leaves1.jpg"
                alt="Company logo"
            />
            <Input className="main-header-search" placeholder="Search here..." prefix={<SearchOutlined />} />
            <Dropdown menu={menuProps} trigger={["click"]}>
                <Button className="user-details" icon={<UserOutlined />}>
                    <Space>
                        Random guy
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </Header>
    );
};
