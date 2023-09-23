import { formatPrice } from '@/lib/format';
import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';
import Ratings from './Ratings';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={'/products/' + product.id}
            className='card card-compact w-full max-w-sm bg-base-100 transition-shadow hover:shadow-lg py-6'
        >
            <figure>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={800}
                    height={400}
                    className='h-36 object-contain'
                />
            </figure>
            <div className='card-body'>
                <div className='flex items-center justify-between'>
                    <span>
                        <span className='card-title inline-block text-base font-normal'>
                            {product.name}
                        </span>
                    </span>
                </div>
                {/* <p>{product.description.substring(0, 50)}</p> */}

                <Ratings rated={product.ratings ? product.ratings : 0} />
                <div className='flex flex-1 items-end'>
                    {product.discountRate > 0 ? (
                        <div className='flex flex-wrap items-center'>
                            <div>
                                <span className='text-base font-bold text-error'>
                                    {formatPrice(
                                        (product.price * (100 - product.discountRate)) / 100
                                    )}
                                </span>
                                <span className='text-sm font-normal'>
                                    &nbsp;&nbsp;-{product.discountRate}%&nbsp;&nbsp;
                                </span>
                            </div>
                            <PriceTag
                                className='text-sm font-normal line-through'
                                price={product.price}
                            />
                        </div>
                    ) : (
                        <PriceTag className='font-normal' price={product.price} />
                    )}
                </div>
            </div>
        </Link>
    );
}
