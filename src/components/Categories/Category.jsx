import React from 'react'
import { CategoryWrapper } from './CategoriesStyles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategory } from '../../redux/categories/CategoriesSlice'

const Category = ({title, category}) => {
    const {selectedCategory} = useSelector((state) => state.categories)
    const dispatch = useDispatch()

    return (
        <CategoryWrapper
            selected={category === selectedCategory}
            onClick={() => dispatch(selectCategory(category))}
            whileHover={{ scale: 0.98 }}
        >
            <p>{title}</p>
        </CategoryWrapper>
    )
}

export default Category