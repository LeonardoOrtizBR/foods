'use client'

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../helpers/price";

export interface CartProduct extends Prisma.ProductGetPayload<{
    include: {
        restaurant: {
            select: {
                deliveryFee: true
            }
        }
    }
}> {
    quantity: number
}

interface ICartContext {
    products: CartProduct[];
    subtotalPrice: number;
    totalPrice: number;
    totalDiscounts: number;
    addProductToCart: ({ product, quantity, emptyCart }: {
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFee: true
                    }
                }
            }
        }>, quantity: number, emptyCart?: boolean
    }) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subtotalPrice: 0,
    totalPrice: 0,
    totalDiscounts: 0,
    addProductToCart: () => { },
    decreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProductFromCart: () => { },
})

export const CartProdivder = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<CartProduct[]>([])
    const subtotalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.price) * product.quantity
        }, 0)
    }, [products])

    const totalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + calculateProductTotalPrice(product) * product.quantity
        }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    }, [products])

    const totalDiscounts = subtotalPrice - totalPrice

    const decreaseProductQuantity = (productId: string) => {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    if (cartProduct.quantity === 1) {
                        return cartProduct
                    }
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity - 1,
                    };
                }
                return cartProduct
            })
        )
    }

    const increaseProductQuantity = (productId: string) => {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1,
                    };
                }
                return cartProduct
            })
        )
    }

    const removeProductFromCart = (productId: string) => {
        return setProducts((prev) => prev.filter((product) => product.id !== productId))
    }

    const addProductToCart = (
        { product, quantity, emptyCart }: {
            product: Prisma.ProductGetPayload<{
                include: {
                    restaurant: {
                        select: {
                            deliveryFee: true
                        }
                    }
                }
            }>, quantity: number, emptyCart?: boolean
        }
    ) => {
        if (emptyCart) {
            setProducts([])
        }

        // verificar se o poroduto ja esta no carrinho
        const isProductAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)
        // se ele estiver, aumentar a sua quantidade
        if (isProductAlreadyOnCart) {
            return setProducts((prev) =>
                prev.map((cartProduct) => {
                    if (cartProduct.id === product.id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity,
                        };
                    }
                    return cartProduct
                })
            )
        }
        // se não, adiciona-lo com a sua quantidade recebida

        setProducts((prev) => [...prev, { ...product, quantity: quantity }])
    }

    return (
        <CartContext.Provider value={{ products, subtotalPrice, totalPrice, totalDiscounts, addProductToCart, decreaseProductQuantity, increaseProductQuantity, removeProductFromCart }} >
            {children}
        </CartContext.Provider>
    )
}