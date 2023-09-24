import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getSubCategories, getBrands } from './actions';
import { Prisma, Product } from '@prisma/client';
import PageFilter from './PageFilter';
import SideNav from './SideNav';

interface HomeProps {
    searchParams: {
        page: string | undefined;
        category: string | undefined;
        subCategory: string | undefined;
        brand: string | undefined;
        onSale: string | undefined;
        sort: string | undefined;
    };
}

export default async function Home({
    searchParams: { page = '1', category, subCategory, brand, onSale, sort },
}: HomeProps) {
    const currentPage = parseInt(page);
    const pageSize = 9;
    let totalItemCount = await prisma.product.count();
    const sortOrder = sort as Prisma.SortOrder;

    let products: Product[];

    if (category) {
        products = await prisma.product.findMany({
            orderBy: { price: sortOrder },
            where: {
                AND: {
                    category: { equals: category },
                    subCategory: subCategory ? { equals: subCategory } : {},
                    brand: brand ? { in: brand.split(',') } : {},
                    discountRate: onSale ? { not: 0 } : {},
                },
            },
        });
        totalItemCount = products.length;
    } else {
        const all = await prisma.product.findMany({
            orderBy: { price: sortOrder },
            where: {
                discountRate: onSale ? { not: 0 } : {},
            },
        });
        totalItemCount = all.length;

        products = await prisma.product.findMany({
            orderBy: { price: sortOrder },
            skip: (currentPage - 1) * pageSize,
            take: pageSize,
            where: {
                discountRate: onSale ? { not: 0 } : {},
            },
        });
    }
    const totalPages = Math.ceil(totalItemCount / pageSize);
    const randomlyChosenItemNumber = 1;

    if (parseInt(page) > totalPages && parseInt(page) !== 1) {
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
            <div className='flex w-full'>
                <SideNav
                    params={{ brand, category, subCategory, onSale, sort }}
                    subCategories={subCategories}
                    categories={categories}
                    brands={brands}
                />
                <div className='flex basis-4/5 flex-col items-center'>
                    <div className='flex w-full items-center justify-between rounded-xl bg-gray-50 p-3'>
                        <div>{totalItemCount} results</div>
                        <PageFilter sort={sort} onSale={onSale} />
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
