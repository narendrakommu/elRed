import { useEffect, useState } from "react";
import { CategoryCard } from "../components"
import { SUBCATEGORY } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import { handleSelectedSubCategoryId, handleSubCategories } from "../redux/shopListSlice";
import { Skeleton } from "antd";

const SubCategories = ({ }) => {
    const dispatch = useDispatch();
    const subCategories = useSelector((state) => state.shopList.subCategories);
    const selectedCategoryId = useSelector((state) => state.shopList.selectedCategoryId);
    const [isLoading, setIsLoading] = useState(true);

    if (!subCategories[selectedCategoryId]) {
        !isLoading && setIsLoading(true);
    } else {
        isLoading && setIsLoading(false);
    }

    useEffect(() => {
        if (!subCategories[selectedCategoryId] && selectedCategoryId) {
            fetch(`https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${selectedCategoryId}.json`)
                .then((res) => res.json())
                .then((res) => {
                    dispatch(handleSubCategories({ categoryId: selectedCategoryId, subCategories: res.result }))
                    setIsLoading(false);
                });
        }
    }, [selectedCategoryId]);

    const handleCardSelect = (id) => {
        dispatch(handleSelectedSubCategoryId(id));
    }

    return <>
        <div className="sub-categories">
            <Skeleton loading={isLoading}>
                {subCategories[selectedCategoryId]?.length ? (
                    subCategories[selectedCategoryId]?.map((subCategory) => (
                        <CategoryCard
                            handleCardSelect={handleCardSelect}
                            key={subCategory.subCategoryId}
                            id={subCategory.subCategoryId}
                            imageUrl={subCategory.subCategoryImageURL}
                            name={subCategory.subCategoryName}
                            type={SUBCATEGORY}
                        />
                    ))
                ) : (
                    <p>No sub-categories are present for this category</p>
                )}
            </Skeleton>
        </div>
    </>
}

export { SubCategories };