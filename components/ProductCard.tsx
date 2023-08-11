import { Product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

    return (
        <Link
            href={'/products/' + product.id}
            className='card w-full bg-base-100 transition-shadow hover:shadow-xl'
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
                <span>
                    <span className='card-title inline-block'>{product.name}</span>
                    {product.variant && (
                        <span className='badge badge-ghost badge-lg'>{product.variant}</span>
                    )}
                </span>
                {isNew && <div className='badge badge-secondary'>NEW</div>}
                <p>{product.description}</p>
                <div className='flex justify-between gap-2'>
                    <PriceTag price={product.price} />
                    {product.tags.length > 0 && (
                        <div className='text-right'>
                            {product.tags
                                .sort()
                                .slice(0, 5)
                                .map((tag, index) => (
                                    <span key={index} className='badge badge-outline'>
                                        {tag}
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
