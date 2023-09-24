'use client';

import Link from 'next/link';
import qs from 'query-string';
import { useRouter } from 'next/navigation';

interface Props {
    category: string | undefined;
    brand: string | undefined;
    categories: Map<string, number>;
    subCategories: Map<string, number>;
    brands: Map<string, number>;
}

const SideNav = ({ category, brand, categories, subCategories, brands }: Props) => {
    const router = useRouter();

    function updateCategoryParam(categoryUpdate: string) {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                onSale: categoryUpdate ? 'true' : undefined,
            },
        });

        router.push(url);
    }

    return (
        <div className='mb-16 mr-4 min-w-[200px] basis-1/5 rounded-xl bg-gray-50 py-4'>
            <div className='collapse collapse-arrow rounded-none'>
                <input type='checkbox' />
                <div className='text-md collapse-title bg-base-200 font-normal'>Categories</div>
                <div className='collapse-content text-sm font-light'>
                    <Link key={0} className='link-hover link mt-4 block capitalize' href={`/`}>
                        All Products
                    </Link>
                    {Array.from(categories.keys()).map((each, index) => (
                        <Link
                            key={index + 1}
                            className='link-hover link mt-4 block capitalize'
                            href={`/?category=${each}`}
                        >
                            {each} ({categories.get(each)})
                        </Link>
                    ))}
                </div>
            </div>
            {category && (
                <>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' defaultChecked={!!category} />
                        <div className='text-md collapse-title bg-base-200 font-normal'>
                            Sub Categories
                        </div>
                        <div className='collapse-content text-sm font-light'>
                            {Array.from(subCategories.keys()).map((each, index) => (
                                <Link
                                    key={index}
                                    className='link-hover link mt-4 block capitalize'
                                    href={`/?category=${category}&subCategory=${each}`}
                                >
                                    {each}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' defaultChecked={!!category} />
                        <div className='text-md collapse-title bg-base-200 font-normal'>Brands</div>
                        <div className='collapse-content mt-2 text-sm font-light'>
                            <div className='form-control'>
                                {Array.from(brands.keys()).map((each, index) => (
                                    <label key={index} className='label cursor-pointer'>
                                        <Link
                                            key={index}
                                            className='link-hover link flex items-center gap-2 capitalize'
                                            href={`/?category=${category}&brand=${
                                                brand
                                                    ? brand.split(',').includes(each)
                                                        ? brand
                                                              .split(',')
                                                              .filter((item) => item !== each)
                                                              .join(',')
                                                        : brand + ',' + each
                                                    : each
                                            }`}
                                        >
                                            <input
                                                type='checkbox'
                                                checked={!!brand && brand.split(',').includes(each)}
                                                className='checkbox checkbox-xs'
                                                readOnly
                                            />
                                            <span>{each}</span>
                                        </Link>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SideNav;
