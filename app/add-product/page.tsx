'use client';

import FormSubmitButton from '@/components/FormSubmitButton';
import { redirect } from 'next/navigation';
import { addProduct, getProducts } from './actions';
import { getSession } from 'next-auth/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Session } from 'next-auth';
import { GlobalContext } from '@/providers/GlobalProvider';

export const metadata = {
    title: 'Add Product - Flowmazon',
};

export default function AddProductPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [newValue, setNewValue] = useState('');
    const { categoriesMap } = useContext(GlobalContext);
    const didMount = useRef(false);

    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        setLoaded(true);
    }, [session])

    async function fetchSession() {
        setSession(await getSession());
    }

    if (loaded && !session) {
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
                    placeholder='Price'
                    type='number'
                    className='input input-bordered mb-3 w-full'
                />
                <input
                    required
                    name='tags'
                    placeholder='Tags e.g. furniture, green, etc.'
                    className='input input-bordered mb-3 w-full'
                />
                <fieldset className='flex gap-2'>
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
                </fieldset>
                <fieldset className='flex gap-2'>
                    <select
                        defaultValue='none'
                        name='category'
                        onChange={(e) => {
                            if (e.target.value === '') {
                                document
                                    .getElementById('new_category_field')
                                    ?.removeAttribute('disabled');
                            } else {
                                document
                                    .getElementById('new_category_field')
                                    ?.setAttribute('disabled', 'true');
                            }
                        }}
                        className='select mb-3 w-full max-w-xs capitalize'
                    >
                        <option value='none'>
                            Select Category
                        </option>
                        {Array.from(categoriesMap.keys()).map((category, index) => (
                            <option key={index} value={category} className='capitalize'>
                                {category}
                            </option>
                        ))}
                        <option key={categoriesMap.size} value={newValue}>
                            [New Category]
                        </option>
                    </select>
                    <input
                        required
                        id='new_category_field'
                        name='category'
                        placeholder='New Category'
                        className='input input-bordered mb-3'
                        onChange={(e) => {
                            setNewValue(e.target.value);
                        }}
                        disabled
                    />
                </fieldset>
                <FormSubmitButton className='btn-primary btn-block'>Add Product</FormSubmitButton>
            </form>
        </div>
    );
}
