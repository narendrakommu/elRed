import { Image, Input, Dropdown, Button, Space, Layout } from "antd";
import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { companyLogoUrl, userMenuProps } from "./constants";

const { Header } = Layout;

const AppHeader = () => {
    return (
        <Header className="main-header">
            <Image
                className="compny-logo"
                preview={false}
                width={45}
                height={45}
                src={companyLogoUrl}
                alt="Company logo"
            />
            <Input className="main-header-search" placeholder="Search here..." prefix={<SearchOutlined />} />
            <Dropdown menu={userMenuProps} trigger={["click"]}>
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

export default AppHeader;
