import { Layout } from 'antd';
import { CategoryCard } from '../../CategoryCard';
import { SUBCATEGORY } from './ContentBody';
import { HomeFilled } from "@ant-design/icons";

const { Footer } = Layout;

export const ContentFooter = ({ subCategories, handleSelectedItem, handleSubCategoryProducts, handleSelectedSubCategoryId, selectedSubCategoryId }) => {
    return <Footer className='content-footer'>
        <div className='home-wrapper'>
            <HomeFilled onClick={() => { handleSubCategoryProducts(null); handleSelectedSubCategoryId(''); }} className='footer-home' />
        </div>
        <div className="footer-sub-categories">
            {subCategories.map((subCategory) => (
                <div className='perspective-wrapper'>
                    <CategoryCard
                        handleSelectedItem={handleSelectedItem}
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