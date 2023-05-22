import { useEffect } from "react";
import { CategoryCard } from "../components"
import { CATEGORY, categoriesUrl } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import { handleCategories, handleSelectedCategoryId } from "../redux/shopListSlice";

const Categories = ({ }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.shopList.categories);
    const selectedCategoryId = useSelector((state) => state.shopList.selectedCategoryId);

    useEffect(() => {
        !categories.length && fetch(categoriesUrl)
            .then((res) => res.json())
            .then((res) => {
                dispatch(handleCategories(res.result));
                dispatch(handleSelectedCategoryId(res.result[0]?.categoryId));
            });
    }, []);

    const handleCardSelect = (id) => {
        dispatch(handleSelectedCategoryId(id));
    }

    return <div className="categories">
        {categories.map((category) => (
            <CategoryCard
                handleCardSelect={handleCardSelect}
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
}

export { Categories };