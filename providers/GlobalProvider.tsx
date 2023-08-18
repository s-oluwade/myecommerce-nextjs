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
    categoriesMap: new Map<string, number>(),
    setCategoriesMap: () => {
        return new Map<string, number>();
    },
    subCategoriesMap: new Map<string, number>(),
    setSubCategoriesMap: () => {
        return new Map<string, number>();
    },
};

interface IContext {
    products: Product[] | null;
    setProducts: React.Dispatch<Product[]> | null;
    categoriesMap: Map<string, number>;
    setCategoriesMap: React.Dispatch<Map<string, number>>;
    subCategoriesMap: Map<string, number>;
    setSubCategoriesMap: React.Dispatch<Map<string, number>>;
}

export const GlobalContext = createContext<IContext>(initialState);

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [categoriesMap, setCategoriesMap] = useState<Map<string, number>>(new Map());
    const [subCategoriesMap, setSubCategoriesMap] = useState<Map<string, number>>(new Map());

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
                setSubCategoriesMap((old) => {
                    const oldValue = old.get(product.subCategory);
                    if (oldValue) {
                        const newMap = old.set(product.subCategory, oldValue + 1);
                        return newMap;
                    }
                    else {
                        const newMap = old.set(product.subCategory, 1);
                        return newMap;
                    }
                });
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
                subCategoriesMap,
                setSubCategoriesMap,
                products,
                setProducts,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
