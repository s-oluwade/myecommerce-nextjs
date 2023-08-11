import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
    title: 'Add Product - Flowmazon',
};

interface AddProductPageProps {
    searchParams: { success: string | undefined };
}

async function addProduct(formData: FormData) {
    'use server';

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price')) || 0;
    const variant = formData.get('variant')?.toString();
    const brand = formData.get('brand')?.toString();
    const tags = formData.get('tags')?.toString().split(',');

    if (!name || !description || !imageUrl || !price || !tags) {
        throw Error('Missing required fields');
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price, variant, brand, tags },
    });

    redirect('/add-product?success=true');
}

export default async function AddProductPage({ searchParams: { success } }: AddProductPageProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    return (
        <div>
            <h1 className='mb-3 text-lg font-bold'>Add Product</h1>
            <form action={addProduct}>
                <input
                    required
                    name='name'
                    placeholder='Name'
                    className='input input-bordered mb-3 w-full'
                />
                <textarea
                    required
                    name='description'
                    placeholder='Description'
                    className='textarea textarea-bordered mb-3 w-full'
                />
                <input
                    required
                    name='imageUrl'
                    placeholder='Image URL'
                    type='url'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    required
                    name='price'
                    placeholder='Price'
                    type='number'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    name='variant'
                    placeholder='Variant (optional)'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    name='brand'
                    placeholder='Brand (optional)'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    required
                    name='tags'
                    placeholder='Tags (separated by comma) e.g. furniture, green, etc.'
                    className='input input-bordered mb-3 w-full'
                />
                <FormSubmitButton className='btn-primary btn-block'>Add Product</FormSubmitButton>
            </form>
            {success === 'true' && (
                <div className='alert alert-success my-2'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 shrink-0 stroke-current'
                        fill='none'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                    <span>Product added to database!</span>
                </div>
            )}
        </div>
    );
}
