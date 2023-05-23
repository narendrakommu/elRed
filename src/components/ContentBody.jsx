import { Input, Typography, Layout, Divider } from "antd";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Products, Categories, SubCategories } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { handleClearProducts, handleSelectedSubCategoryId } from "../redux/shopListSlice";

const { Content } = Layout;
const { Title } = Typography;

const ContentBody = ({ }) => {
    const dispatch = useDispatch();
    const selectedSubCategoryId = useSelector((state) => state.shopList.selectedSubCategoryId);

    const handleArrowClick = () => {
        // dispatch(handleClearProducts());
        dispatch(handleSelectedSubCategoryId(''));
    }

    return <Content className="content-body">
        <div className="content-header">
            <Title className="content-title" level={4}>
                {!selectedSubCategoryId ? 'Print Heads' : (<>
                    <ArrowLeftOutlined onClick={handleArrowClick} className='product-arrow' />All Products
                </>)}
            </Title>
            <Input
                className="content-search"
                placeholder="Search..."
                prefix={<SearchOutlined />}
            />
        </div>
        {!selectedSubCategoryId ? (<>
            <Categories />
            <Divider className="line-breaker" />
            <SubCategories />
        </>) : <Products />
        }
    </Content>
}

export { ContentBody };