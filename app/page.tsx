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
    // const randomItemIndex = Math.floor(Math.random() * totalItemCount);
    const randomItemIndex = 1;

    const products = await prisma.product.findMany({
        orderBy: { name: 'asc' },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

    return (
        <div className='flex flex-col items-center'>
            {/* Random Hero Item */}
            {currentPage === 1 && (
                <div className='hero rounded-xl bg-base-200'>
                    <div className='hero-content flex-col lg:flex-row'>
                        <Image
                            src={products[randomItemIndex].imageUrl}
                            alt={products[randomItemIndex].name}
                            width={400}
                            height={800}
                            className='w-full max-w-sm rounded-lg shadow-2xl'
                            priority
                        />
                        <div>
                            <span>
                                <span className='text-5xl font-bold'>
                                    {products[randomItemIndex].name}
                                </span>
                                {products[randomItemIndex].variant && (
                                    <span className='badge badge-ghost badge-lg'>
                                        {products[randomItemIndex].variant}
                                    </span>
                                )}
                            </span>

                            <p className='py-6'>{products[randomItemIndex].description}</p>
                            <Link
                                href={'/products/' + products[randomItemIndex].id}
                                className='btn btn-primary'
                            >
                                Check it out
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className='my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>

            {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPages={totalPages} />}
        </div>
    );
}
