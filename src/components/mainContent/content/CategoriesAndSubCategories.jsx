import { Divider } from "antd"
import { CategoryCard } from "../../CategoryCard"
import { CATEGORY, SUBCATEGORY } from "./ContentBody"

export const CategoriesAndSubCategories = ({ categories, subCategories, handleSelectedItem, selectedCategoryId }) => {
    return <>
        <div className="categories">
            {categories.map((category) => (
                <CategoryCard
                    handleSelectedItem={handleSelectedItem}
                    key={category.categoryId}
                    id={category.categoryId}
                    imageUrl={category.categoryImageURL}
                    name={category.categoryName}
                    type={CATEGORY}
                    customClass={
                        selectedCategoryId === category.categoryId
                            ? ["selected-border"]
                            : [""]
                    }
                />
            ))}
        </div>
        <Divider className="line-breaker" />
        <div className="sub-categories">
            {subCategories.map((subCategory) => (
                <CategoryCard
                    handleSelectedItem={handleSelectedItem}
                    key={subCategory.subCategoryId}
                    id={subCategory.subCategoryId}
                    imageUrl={subCategory.subCategoryImageURL}
                    name={subCategory.subCategoryName}
                    type={SUBCATEGORY}
                />
            ))}
        </div>
    </>
}