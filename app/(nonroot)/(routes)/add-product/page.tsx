import FormSubmitButton from '@/components/FormSubmitButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import CategoryFields from './CategoryFields';
import { addProduct } from './actions';
import {getCategories, getProducts} from '../../../(root)/actions';

export const metadata = {
    title: 'Add Product - Flowmazon',
};

export default async function AddProductPage() {
    
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    return (
        <div className='mx-auto max-w-lg'>
            <h1 className='mb-3 ml-2 text-lg font-bold'>Add Product</h1>
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
                    placeholder='Price with decimal point e.g. 999 for 9.99'
                    type='number'
                    className='input input-bordered mb-3 w-full'
                />
                <fieldset className='flex gap-2'>
                    <input
                        required
                        name='color'
                        placeholder='Color'
                        className='input input-bordered mb-3 w-full'
                    />
                    <input
                        required
                        name='brand'
                        placeholder='Brand'
                        className='input input-bordered mb-3 w-full'
                    />
                </fieldset>
                <CategoryFields
                    categories={await getCategories()}
                    products={await getProducts()}
                />
                <input
                    name='variant'
                    placeholder='Variant (Optional)'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    name='discount'
                    placeholder='Discount Rate in % (Optional, Defaults to 0%)'
                    type='number'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    name='tags'
                    placeholder='Tags (Optional) e.g. furniture, green'
                    className='input input-bordered mb-3 w-full'
                />
                <FormSubmitButton className='btn-primary btn-block'>Add Product</FormSubmitButton>
            </form>
        </div>
    );
}
