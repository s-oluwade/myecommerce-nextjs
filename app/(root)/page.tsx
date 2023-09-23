import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getSubCategories, getBrands } from './actions';
import { Prisma, Product } from '@prisma/client';
import PageFilter from './PageFilter';

interface HomeProps {
    searchParams: {
        page: string;
        category: string;
        subCategory: string;
        brand: string;
        sale: string;
        sort: string;
    };
}

export default async function Home({
    searchParams: { page = '1', category, subCategory, brand, sale, sort },
}: HomeProps) {
    const currentPage = parseInt(page);
    const pageSize = 12;
    let totalItemCount = await prisma.product.count();
    const sortOrder = sort as Prisma.SortOrder;

    let products: Product[];

    if (category) {
        if (subCategory) {
            products = await prisma.product.findMany({
                orderBy: { price: sortOrder },
                where: {
                    AND: {
                        category: { equals: category },
                        subCategory: { equals: subCategory },
                    },
                },
            });
        } else if (brand) {
            const options = brand.split(',');
            products = await prisma.product.findMany({
                orderBy: { price: sortOrder },
                where: {
                    AND: {
                        category: { equals: category },
                        brand: { in: options },
                    },
                },
            });
        } else {
            products = await prisma.product.findMany({
                orderBy: { price: sortOrder },
                where: {
                    category: { equals: category },
                },
            });
        }
        totalItemCount = products.length;
    } else if (sale) {
        products = await prisma.product.findMany({
            orderBy: { price: sortOrder },
            where: {
                discountRate: { not: 0 },
            },
        });
        totalItemCount = products.length;
    } else {
        products = await prisma.product.findMany({
            orderBy: { price: sortOrder },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
        });
    }

    const totalPages = Math.ceil(totalItemCount / pageSize);
    const randomlyChosenItemNumber = 1;

    if (parseInt(page) > totalPages || parseInt(page) < 1) {
        notFound();
    }

    const categories = await getCategories();
    let subCategories: Map<string, number> = new Map();
    let brands: Map<string, number> = new Map();
    if (category) {
        subCategories = await getSubCategories(category);
        brands = await getBrands(category);
    }

    return (
        <div className='flex flex-col items-center'>
            {/* Random Hero Item, disabled with a value of 0, will renable with a value of 1 */}
            {currentPage === 0 && (
                <div className='hero rounded-xl bg-base-200'>
                    <div className='hero-content flex-col lg:flex-row'>
                        <Image
                            src={products[randomlyChosenItemNumber].imageUrl}
                            alt={products[randomlyChosenItemNumber].name}
                            width={400}
                            height={800}
                            className='w-full max-w-sm rounded-lg shadow-2xl'
                            priority
                        />
                        <div>
                            <span>
                                <span className='text-5xl font-bold'>
                                    {products[randomlyChosenItemNumber].name}
                                </span>
                                {products[randomlyChosenItemNumber].variant && (
                                    <span className='badge badge-ghost badge-lg'>
                                        {products[randomlyChosenItemNumber].variant}
                                    </span>
                                )}
                            </span>
                            <p className='py-6'>{products[randomlyChosenItemNumber].description}</p>
                            <Link
                                href={'/products/' + products[randomlyChosenItemNumber].id}
                                className='btn btn-primary'
                            >
                                Check it out
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex'>
                <div className='mb-16 mr-4 min-w-[200px] basis-1/5 rounded-xl bg-gray-50 py-4'>
                    <div className='collapse collapse-arrow rounded-none'>
                        <input type='checkbox' />
                        <div className='text-md collapse-title bg-base-200 font-normal'>
                            Categories
                        </div>
                        <div className='collapse-content text-sm font-light'>
                            <Link
                                key={0}
                                className='link-hover link mt-4 block capitalize'
                                href={`/`}
                            >
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
                                <div className='text-md collapse-title bg-base-200 font-normal'>
                                    Brands
                                </div>
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
                                                                      .filter(
                                                                          (item) => item !== each
                                                                      )
                                                                      .join(',')
                                                                : brand + ',' + each
                                                            : each
                                                    }`}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        checked={
                                                            !!brand &&
                                                            brand.split(',').includes(each)
                                                        }
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
                <div className='flex basis-4/5 flex-col items-center'>
                    <div className='flex w-full items-center justify-between rounded-xl bg-gray-50 p-3'>
                        <div>{totalItemCount} results</div>
                        <PageFilter sale={sale} />
                    </div>
                    <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
                    )}
                </div>
            </div>
        </div>
    );
}
