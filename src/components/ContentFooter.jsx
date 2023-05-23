import { Layout } from 'antd';
import { CategoryCard } from '../components';
import { HomeFilled } from "@ant-design/icons";
import { SUBCATEGORY } from '../constants';
import { handleClearProducts, handleSelectedSubCategoryId } from '../redux/shopListSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Footer } = Layout;

const ContentFooter = ({ }) => {
    const dispatch = useDispatch();
    const subCategories = useSelector((state) => state.shopList.subCategories);
    const selectedSubCategoryId = useSelector((state) => state.shopList.selectedSubCategoryId);
    const selectedCategoryId = useSelector((state) => state.shopList.selectedCategoryId);

    const handleCardSelect = (id) => {
        dispatch(handleSelectedSubCategoryId(id));
    }

    return <Footer className='content-footer'>
        <div className='home-wrapper'>
            <HomeFilled onClick={() => {
                // dispatch(handleClearProducts([]));
                dispatch(handleSelectedSubCategoryId(''));
            }} className='footer-home' />
        </div>
        <div className="footer-sub-categories">
            {subCategories[selectedCategoryId]?.map((subCategory) => (
                <div key={subCategory.subCategoryId} className='perspective-wrapper'>
                    <CategoryCard
                        handleCardSelect={handleCardSelect}
                        key={subCategory.subCategoryId}
                        id={subCategory.subCategoryId}
                        imageUrl={subCategory.subCategoryImageURL}
                        name={subCategory.subCategoryName}
                        type={SUBCATEGORY}
                        customClass={
                            selectedSubCategoryId === subCategory.subCategoryId
                                ? ["selected-sub-category"]
                                : [""]
                        }
                    />
                </div>
            ))}
        </div>
    </Footer>
}

export { ContentFooter };