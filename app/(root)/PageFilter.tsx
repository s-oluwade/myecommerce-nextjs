'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    sale: string;
}

const PageFilter = ({ sale }: Props) => {
    const [sortValue, setSortValue] = useState('best-match');
    const router = useRouter();
    
    if (sortValue === 'asc') {
        router.push('/?sort=asc')
    }
    else if (sortValue === 'desc') {
        router.push('/?sort=desc')
    }
    else {
        router.push('/')
    }

    return (
        <div className='flex items-center gap-2'>
            <div className='form-control'>
                <label className='label cursor-pointer gap-2'>
                    <span className='label-text whitespace-nowrap'>On Sale</span>
                    <Link
                        href={`/?${!!sale && sale === 'true' ? '' : 'sale=true'}`}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            checked={!!sale && sale !== ''}
                            className='toggle'
                            readOnly
                        />
                    </Link>
                </label>
            </div>
            <span>Sort</span>
            <select
                defaultValue='best-match'
                className='select select-bordered select-sm w-full max-w-xs font-normal'
                onChange={(e) => setSortValue(e.target.value)}
            >
                <option value='best-match'>Best Match</option>
                <option value='asc'>Price Low-High</option>
                <option value='desc'>Price High-Low</option>
            </select>
        </div>
    );
};

export default PageFilter;
