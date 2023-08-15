'use client';

import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { getProducts } from './actions';

const initialState = {
    products: [],
    setProducts: () => {
        return [];
    },
    categories: new Set<string>(),
    setCategories: () => {
        return new Set<string>();
    },
    categoriesMap: new Map<string, number>(),
    setCategoriesMap: () => {
        return new Map<string, number>();
    },
};

interface IContext {
    products: Product[] | null;
    setProducts: React.Dispatch<Product[]> | null;
    categories: Set<string>;
    setCategories: React.Dispatch<Set<string>>;
    categoriesMap: Map<string, number>;
    setCategoriesMap: React.Dispatch<Map<string, number>>;
}

export const GlobalContext = createContext<IContext>(initialState);

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [categories, setCategories] = useState<Set<string>>(new Set());
    const [categoriesMap, setCategoriesMap] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products) {
            products.forEach((product) => {
                setCategoriesMap((old) => {
                    const oldValue = old.get(product.category);
                    if (oldValue) {
                        const newMap = old.set(product.category, oldValue + 1);
                        return newMap;
                    }
                    else {
                        const newMap = old.set(product.category, 1);
                        return newMap;
                    }
                });
                setCategories((old) => new Set([...Array.from(old), product.category]));
            });
        }
    }, [products]);

    async function fetchProducts() {
        setProducts(await getProducts());
    }

    return (
        <GlobalContext.Provider
            value={{
                categoriesMap,
                setCategoriesMap,
                products,
                setProducts,
                categories,
                setCategories,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
