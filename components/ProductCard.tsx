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
            className='card card-compact w-full bg-base-100 transition-shadow hover:shadow-md'
        >
            <figure>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={800}
                    height={400}
                    className='h-48 object-cover'
                />
            </figure>
            <div className='card-body'>
                <div className='flex items-center justify-between'>
                    <span>
                        <span className='card-title inline-block text-base font-normal'>
                            Apple {product.name} (next generation)
                        </span>
                        {product.variant && (
                            <span className='badge badge-ghost badge-lg'>{product.variant}</span>
                        )}
                    </span>
                </div>
                {/* <p>{product.description.substring(0, 50)}</p> */}
                <Ratings rated={product.ratings ? product.ratings : 0} />
                <div className='flex flex-1 items-end gap-2'>
                    <PriceTag price={product.price} />
                </div>
            </div>
        </Link>
    );
}
