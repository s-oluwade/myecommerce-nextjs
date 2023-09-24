'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

interface Props {
    params: {
        category: string | undefined;
        brand: string | undefined;
        onSale: string | undefined;
        sort: string | undefined;
        subCategory: string | undefined;
    };
    categories: Map<string, number>;
    subCategories: Map<string, number>;
    brands: Map<string, number>;
}

const SideNav = ({ params, categories, subCategories, brands }: Props) => {
    const router = useRouter();

    function navigateTo(
        category: string | null = null,
        subCategory: string | null = null,
        brand: string | null = null
    ) {
        if (category) {
            const url = qs.stringifyUrl({
                url: window.location.href,
                query: {
                    ...params,
                    category,
                    page: 1
                },
            });

            router.push(url);
        }
        if (subCategory) {
            const url = qs.stringifyUrl({
                url: window.location.href,
                query: {
                    ...params,
                    subCategory,
                    page: 1
                },
            });

            router.push(url);
        }
        if (brand) {
            const brandUpdate = params.brand
                ? params.brand.split(',').includes(brand)
                    ? params.brand
                          .split(',')
                          .filter((item) => item !== brand)
                          .join(',')
                    : params.brand + ',' + brand
                : brand;
            
            const url = qs.stringifyUrl({
                url: window.location.href,
                query: {
                    ...params,
                    subCategory: undefined,
                    brand: brandUpdate === '' ? undefined : brandUpdate,
                    page: 1
                },
            });
            router.push(url);
        }
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
                        <a
                            key={index + 1}
                            className='link-hover link mt-4 block capitalize'
                            onClick={() => navigateTo(each)}
                        >
                            {each} ({categories.get(each)})
                        </a>
                    ))}
                </div>
            </div>
            {params.category && (
                <>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' defaultChecked={!!params.category} />
                        <div className='text-md collapse-title bg-base-200 font-normal'>
                            Sub Categories
                        </div>
                        <div className='collapse-content text-sm font-light'>
                            {Array.from(subCategories.keys()).map((each, index) => (
                                <a
                                    key={index}
                                    className='link-hover link mt-4 block capitalize'
                                    onClick={() => navigateTo(null, each)}
                                >
                                    {each}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' defaultChecked={!!params.category} />
                        <div className='text-md collapse-title bg-base-200 font-normal'>Brands</div>
                        <div className='collapse-content mt-2 text-sm font-light'>
                            <div className='form-control'>
                                {Array.from(brands.keys()).map((each, index) => (
                                    <label key={index} className='label cursor-pointer'>
                                        <a
                                            key={index}
                                            className='link-hover link flex items-center gap-2 capitalize'
                                            onClick={() => navigateTo(null, null, each)}
                                        >
                                            <input
                                                type='checkbox'
                                                checked={
                                                    !!params.brand &&
                                                    params.brand.split(',').includes(each)
                                                }
                                                className='checkbox checkbox-xs'
                                                readOnly
                                            />
                                            <span>{each}</span>
                                        </a>
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
