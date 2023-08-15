'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export async function addProduct(formData: FormData) {
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
    const category = formData.get('category')?.toString();
    const tags = formData.get('tags')?.toString().split(',');

    if (!name || !description || !imageUrl || !price || !tags || !category || category === 'none') {
        throw Error('Missing required fields');
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price, variant, brand, tags, category },
    });

    redirect('/add-product');
}

export async function getProducts() {
    const products = await prisma.product.findMany();
    
    return products;
}