'use client';

import { GlobalContext } from '@/providers/GlobalProvider';
import Link from 'next/link';
import { useContext } from 'react';

const CategoryList = () => {
    const { categoriesMap } = useContext(GlobalContext);

    return (
        <>
            {Array.from(categoriesMap.keys()).map((category, index) => (
                <Link key={index} className='link-hover link block capitalize' href={'#'}>
                    {category} ({categoriesMap.get(category)})
                </Link>
            ))}
        </>
    );
};

export default CategoryList;
