'use client';

import { useRouter } from 'next/navigation';
import qs from 'query-string';

interface Props {
    onSale: string | undefined;
    sort: string | undefined;
}

const PageFilter = ({ onSale, sort }: Props) => {
    const router = useRouter();

    function updateSortParam(sortUpdate: string) {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                sort: sortUpdate === 'best-match' ? undefined : sortUpdate,
            },
        });

        router.push(url);
    }

    function updateSaleParam(saleUpdate: boolean) {
        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query: {
                    onSale: saleUpdate ? 'true' : undefined,
                },
            }
        );

        router.push(url);
    }

    return (
        <div className='flex items-center gap-2'>
            <div className='form-control'>
                <label className='label cursor-pointer gap-2'>
                    <span className='label-text whitespace-nowrap'>On Sale</span>
                    <input
                        type='checkbox'
                        checked={!!onSale && onSale !== ''}
                        onChange={(e) => {
                            updateSaleParam(e.target.checked);
                        }}
                        className='toggle'
                        readOnly
                    />
                </label>
            </div>
            <span>Sort</span>
            <select
                defaultValue={sort ?? 'best-match'}
                className='select select-bordered select-sm w-full max-w-xs font-normal'
                onChange={(e) => updateSortParam(e.target.value)}
            >
                <option value='best-match'>Best Match</option>
                <option value='asc'>Price Low-High</option>
                <option value='desc'>Price High-Low</option>
            </select>
        </div>
    );
};

export default PageFilter;
