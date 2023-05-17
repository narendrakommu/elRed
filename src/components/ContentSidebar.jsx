import { Menu, Layout, Image } from "antd";
import { companyLogoUrl, contentSidebarMenuItems } from "../constants";

const { Sider } = Layout;

const ContentSidebar = () => {
    return (
        <Sider className="content-sidebar">
            <Image
                className="sidebar-compny-logo"
                preview={false}
                width={40}
                height={40}
                src={companyLogoUrl}
                alt="Company logo"
            />
            <Menu
                defaultSelectedKeys={["2"]}
                mode="inline"
                theme="light"
                items={contentSidebarMenuItems}
            />
        </Sider>
    );
};

export { ContentSidebar };
