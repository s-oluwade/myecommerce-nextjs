'use server';

import { prisma } from "@/lib/db/prisma";

export async function getProducts() {
    const products = await prisma.product.findMany();
    
    return products;
}