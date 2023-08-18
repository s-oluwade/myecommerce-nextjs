'use server';

import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export async function addProduct(formData: FormData) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/add-product');
    }

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price')) || 0;
    const color = formData.get('color')?.toString();
    const category = formData.get('category')?.toString();
    const subCategory = formData.get('subCategory')?.toString();
    const brand = formData.get('brand')?.toString();
    // optional begins
    const variant = formData.get('variant')?.toString() || '';
    const discountRate = Number(formData.get('discount')?.toString()) || 0;
    const tags = formData.get('tags')?.toString().split(',') || [];

    if (
        !name ||
        !description ||
        !imageUrl ||
        !price ||
        !color ||
        !category ||
        category === 'none' ||
        !subCategory ||
        subCategory === 'none' ||
        !brand
    ) {
        throw Error('Missing required fields');
    }

    await prisma.product.create({
        data: {
            name,
            description,
            imageUrl,
            price,
            color,
            category,
            subCategory,
            brand,
            variant,
            discountRate,
            tags,
        },
    });

    redirect('/add-product');
}
