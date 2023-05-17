import {
    AppstoreOutlined,
    DashboardOutlined,
    BorderOuterOutlined,
    HeartOutlined,
    TagsOutlined
} from "@ant-design/icons";

export const userMenuProps = {
    items: [
        {
            label: "coming soon...",
            key: "1"
        }
    ]
};

export const categoriesUrl = "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json";

export const companyLogoUrl = 'https://images.template.net/wp-content/uploads/2017/04/Abstract-Logo-with-Colorful-Leaves1.jpg';

export const defaultImage = `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.JghoYNfLDAu_AH6xfpBYpQHaHa%26pid%3DApi&f=1&ipt=6bcb753956e563a3a67e9669fdea96a05a12edfb077f7faa6c0ac7f31992396f&ipo=images`;

function getItem(label, key, icon, disabled) {
    return {
        key,
        icon,
        label,
        disabled
    };
}

export const contentSidebarMenuItems = [
    getItem("Dashboard", "1", <DashboardOutlined />, true),
    getItem("All Products", "2", <AppstoreOutlined />),
    getItem("Orders", "3", <BorderOuterOutlined />, true),
    getItem("Favorities", "4", <HeartOutlined />, true),
    getItem("New Arrival", "5", <TagsOutlined />, true)
];

export const CATEGORY = 'CATEGORY';
export const SUBCATEGORY = 'SUBCATEGORY';
export const PRODUCT = 'PRODUCT';
export const VARIANT = 'VARIANT';
export const PACKINGDESCRIPTION = 'PACKINGDESCRIPTION';
export const COLORDESCRIPTION = 'COLORDESCRIPTION';
