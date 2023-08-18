'use client';

import Link from "next/link";
import { useRouter } from "next/router";

const PageFilter = () => {


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
            >
                <option disabled value='best-match'>
                    Best Match
                </option>
                <option value='low-high'>Price Low-High</option>
                <option value='high-low'>Price High-Low</option>
            </select>
        </div>
    );
};

export default PageFilter;
