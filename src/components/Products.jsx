import { PRODUCT } from "../constants";
import { CategoryCard } from "../components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { handleProducts, handleDrawerOpen, handleSelectedProductId } from "../redux/shopListSlice";
import { Skeleton } from "antd";

const Products = ({ }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.shopList.products);
    const selectedSubCategoryId = useSelector((state) => state.shopList.selectedSubCategoryId);
    const [isLoading, setIsLoading] = useState(true);

    if (!products[selectedSubCategoryId]) {
        !isLoading && setIsLoading(true);
    } else {
        isLoading && setIsLoading(false);
    }

    useEffect(() => {
        !products[selectedSubCategoryId] && selectedSubCategoryId &&
            fetch(
                `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${selectedSubCategoryId}.json`
            )
                .then((res) => res.json())
                .then((res) => {
                    dispatch(handleProducts({ subCategoryId: selectedSubCategoryId, products: res.result }))
                    setIsLoading(false);
                });
    }, [selectedSubCategoryId])

    const handleCardSelect = (id) => {
        dispatch(handleSelectedProductId(id));
        dispatch(handleDrawerOpen(true));
    }

    return <div className="products">
        <Skeleton loading={isLoading}>
            {products[selectedSubCategoryId]?.length ? products[selectedSubCategoryId].map((product) => (
                <CategoryCard
                    handleCardSelect={handleCardSelect}
                    key={product.productId}
                    id={product.productId}
                    imageUrl={product.productImages.find(ele => ele)}
                    name={product.itemDescription}
                    type={PRODUCT}
                    discription='Best household product interms of quality and life validity'
                    customClass={['product']}
                />
            )) : <p>There are no products for this sub category</p>}
        </Skeleton>
    </div>
}

export { Products };