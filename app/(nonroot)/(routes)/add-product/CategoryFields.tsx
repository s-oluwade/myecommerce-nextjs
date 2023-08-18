"use client";

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

interface CategoryFieldsProps {
    categories: Map<string, number>;
    products: Product[];
}

const CategoryFields = ({categories, products}:CategoryFieldsProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [newCategory, setNewCategory] = useState<string>('');
    // const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(undefined);
    const [newSubCategory, setNewSubCategory] = useState<string>('');
    const [filteredSubCategories, setFilteredSubCategories] = useState<Set<string>>(new Set());

    useEffect(() => {
        const temp = new Set<string>();
        products.forEach((product) => {
            if (product.category === selectedCategory) {
                temp.add(product.subCategory);
            }
        })
        console.log(selectedCategory);
        setFilteredSubCategories(temp);
    }, [selectedCategory, products])

    return (
        <>
            <fieldset className='flex gap-2'>
                <select
                    required
                    defaultValue='none'
                    name='category'
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        if (e.target.value === '') {
                            document
                                .getElementById('new_category_field')
                                ?.removeAttribute('disabled');
                        } else {
                            document
                                .getElementById('new_category_field')
                                ?.setAttribute('disabled', 'true');
                        }
                    }}
                    className='select mb-3 w-full max-w-xs capitalize'
                    {...(newCategory !== '' ? {disabled: true} : {disabled:false})}
                >
                    <option value='none'>Select Category</option>
                    {Array.from(categories.keys()).map((each, index) => (
                        <option key={index} value={each} className='capitalize'>
                            {each}
                        </option>
                    ))}
                    <option key={categories.size} value={newCategory}>
                        [New Category]
                    </option>
                </select>
                <input
                    required
                    id='new_category_field'
                    name='category'
                    placeholder='New Category'
                    className='input input-bordered mb-3'
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setNewCategory(e.target.value);
                    }}
                    disabled
                />
            </fieldset>
            <fieldset className='flex gap-2'>
                <select
                    required
                    defaultValue='none'
                    name='subCategory'
                    onChange={(e) => {
                        // setSelectedSubCategory(e.target.value);
                        if (e.target.value === '') {
                            document
                                .getElementById('new_subcategory_field')
                                ?.removeAttribute('disabled');
                        } else {
                            document
                                .getElementById('new_subcategory_field')
                                ?.setAttribute('disabled', 'true');
                        }
                    }}
                    className='select mb-3 w-full max-w-xs capitalize'
                    {...(newSubCategory !== '' ? {disabled: true} : {disabled:false})}
                >
                    <option value='none'>Select Sub-Category</option>
                    {Array.from(filteredSubCategories.keys()).map((each, index) => (
                        <option key={index} value={each} className='capitalize'>
                            {each}
                        </option>
                    ))}
                    <option key={filteredSubCategories.size} value={newSubCategory}>
                        [New Sub-Category]
                    </option>
                </select>
                <input
                    required
                    id='new_subcategory_field'
                    name='subCategory'
                    placeholder='New Sub-Category'
                    className='input input-bordered mb-3'
                    onChange={(e)=>{
                        // setSelectedSubCategory(e.target.value);
                        setNewSubCategory(e.target.value);
                    }}
                    disabled
                />
            </fieldset>
        </>
        );
}
 
export default CategoryFields;