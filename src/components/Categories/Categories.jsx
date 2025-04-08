import React from 'react'
import { useSelector } from "react-redux"
import { CategoriesContainerStyled, CategoriesWrapper, CategoryWrapper } from './CategoriesStyles'
import Category from './Category'

const Categories = () => {
    const { categories } = useSelector((state) => state.categories)
    return (
        <CategoriesContainerStyled>
            <CategoriesWrapper>
                {
                    categories.map((category) => {
                        return <Category key={category.id} {...category} selected={true} />
                    })
                }
            </CategoriesWrapper>
        </CategoriesContainerStyled>
    )
}

export default Categories