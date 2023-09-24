'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
    const router = useRouter();

    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

    const numberedPageItems: JSX.Element[] = [];

    for (let page = minPage; page <= maxPage; page++) {
        numberedPageItems.push(
            <a
            onClick={() => navigateTo(page)}
                key={page}
                className={`btn join-item ${
                    currentPage === page ? 'btn-active pointer-events-none' : ''
                }`}
            >
                {page}
            </a>
        );
    }

    const navigateTo = (page: number | undefined = undefined) => {
        const url = qs.stringifyUrl({
            url: window.location.href,
            query: {
                page,
            },
        });

        router.push(url);
    };

    return (
        <>
            <div className='join hidden sm:block'>{numberedPageItems}</div>
            <div className='join block sm:hidden'>
                {currentPage > 1 && (
                    <a onClick={() => navigateTo(currentPage - 1)} className='btn join-item'>
                        «
                    </a>
                )}
                <button className='btn join-item pointer-events-none'>Page {currentPage}</button>
                {currentPage < totalPages && (
                    <a onClick={() => navigateTo(currentPage + 1)} className='btn join-item'>
                        »
                    </a>
                )}
            </div>
        </>
    );
}
