'use server';

import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import { cache } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const getProducts = cache(async () => {
    const products = await prisma.product.findMany();
    if (!products) notFound();
    return products;
});

export async function getCategories() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    const products = await getProducts();
    const categories = new Map<string, number>();

    products.forEach((product) => {
        const count = categories.get(product.category);
        if (count) {
            categories.set(product.category, count + 1);
        } else {
            categories.set(product.category, 1);
        }
    });

    return categories;
}

export async function getSubCategories(category: string) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    const products = await getProducts();
    const subCategories = new Map<string, number>();

    if (category === '') {
        // get all sub-categories
        products.forEach((product) => {
            const count = subCategories.get(product.subCategory);
            if (count) {
                subCategories.set(product.subCategory, count + 1);
            } else {
                subCategories.set(product.subCategory, 1);
            }
        });
    }
    else {
        // get sub-categories under category
        products.forEach((product) => {
            if (product.category === category) {
                const count = subCategories.get(product.subCategory);
                if (count) {
                    subCategories.set(product.subCategory, count + 1);
                } else {
                    subCategories.set(product.subCategory, 1);
                }
            }
        });
    }
    

    return subCategories;
}

export async function getBrands(category: string) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    const products = await getProducts();
    const brands = new Map<string, number>();

    products.forEach((product) => {
        if (product.category === category) {
            const count = brands.get(product.brand);
            if (count) {
                brands.set(product.brand, count + 1);
            } else {
                brands.set(product.brand, 1);
            }
        }
    });

    return brands;
}