import CategoryList from '@/components/CategoryList';
import PaginationBar from '@/components/PaginationBar';
import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps {
    searchParams: { page: string };
}

export default async function Home({ searchParams: { page = '1' } }: HomeProps) {
    
    const currentPage = parseInt(page);
    const pageSize = 6;
    const totalItemCount = await prisma.product.count();
    const totalPages = Math.ceil(totalItemCount / pageSize);
    const randomlyChosenItemNumber = 1;

    const products = await prisma.product.findMany({
        orderBy: { name: 'asc' },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

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
                <div className='mr-4 shrink-0 basis-1/5 rounded-md bg-base-100'>
                    <div className='collapse collapse-arrow rounded-none'>
                        <input type='checkbox' />
                        <div className='text-md collapse-title font-light'>Categories</div>
                        <div className='collapse-content font-light'>
                            <CategoryList />
                        </div>
                    </div>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' />
                        <div className='text-md collapse-title font-light'>Brands</div>
                        <div className='collapse-content'>
                            <div className='form-control'>
                                <label className='label cursor-pointer justify-start gap-4'>
                                    <input type='checkbox' className='checkbox' />
                                    <span className='label-text'>Apple</span>
                                </label>
                                <label className='label cursor-pointer justify-start gap-4'>
                                    <input type='checkbox' className='checkbox' />
                                    <span className='label-text'>Samsung</span>
                                </label>
                                <label className='label cursor-pointer justify-start gap-4'>
                                    <input type='checkbox' className='checkbox' />
                                    <span className='label-text'>Sony</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='collapse-arrow collapse rounded-none'>
                        <input type='checkbox' />
                        <div className='text-md collapse-title font-light'>Tags</div>
                        <div className='collapse-content'>
                            <p>hello</p>
                        </div>
                    </div>
                </div>
                <div className='flex basis-4/5 flex-col items-center'>
                    <div className='flex w-full items-center justify-between rounded-md bg-gray-300 p-3'>
                        <div>{totalItemCount} results</div>
                        <div className='flex items-center gap-2'>
                            <div className='form-control'>
                                <label className='label cursor-pointer gap-2'>
                                    <span className='label-text whitespace-nowrap'>In Stock</span>
                                    <input type='checkbox' className='toggle' />
                                </label>
                            </div>
                            <div className='form-control'>
                                <label className='label cursor-pointer gap-2'>
                                    <span className='label-text whitespace-nowrap'>On Sale</span>
                                    <input type='checkbox' className='toggle' />
                                </label>
                            </div>
                            <span>Sort</span>
                            <select defaultValue='best-match' className='select select-bordered select-sm w-full max-w-xs font-normal'>
                                <option disabled value='best-match'>
                                    Best Match
                                </option>
                                <option value='low-high'>Price Low-High</option>
                                <option value='high-low'>Price High-Low</option>
                            </select>
                        </div>
                    </div>
                    <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
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
