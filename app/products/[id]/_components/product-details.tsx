'use client'

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/deleivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/app/helpers/price";
import { Prisma } from "@prisma/client";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>;
    complementaryProduct: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[]
}

const ProductDetails = ({ product, complementaryProduct }: ProductDetailsProps) => {

    const [quantity, setQuantity] = useState(1)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
    const { addProductToCart, products } = useContext(CartContext)

    const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
        addProductToCart({ product, quantity, emptyCart })
        setIsCartOpen(true)
    }

    const hundleAddToCartClick = () => {
        // verificar se ha algum produto de outro restaurante no carrinho
        const hasDifferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurantId !== product.restaurantId
        )

        // se houver, abrir um aviso
        if (hasDifferentRestaurantProduct) {
            return setIsConfirmationDialogOpen(true)
        }

        addToCart({ emptyCart: false })
    }

    const handleIncreaseQuantityClick = () => setQuantity((currentState) => currentState + 1);
    const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
        if (currentState === 1) return 1;
        return currentState - 1
    });

    return (
        <>
            <div className=" py-5 rounded-tl-3xl rounded-tr-3xl relative bg-white z-50 mt-[-1.5rem]">
                {/* Restaurante */}
                <div className="flex items-center gap-[0.375rem] px-5">
                    <div className="relative h-6 w-6">
                        <Image src={product.restaurant.imageUrl} alt={product.restaurant.name} fill className="rounded-full object-cover" />
                    </div>
                    <span className=" text-xs text-muted-foreground">{product.restaurant.name}</span>
                </div>
                {/* Nome do produto */}
                <h1 className=" text-xl font-semibold mb-2 mt-1 px-5">{product.name}</h1>
                {/* Preço do produto e quantidade */}
                <div className="flex justify-between px-5">
                    {/* Preço com desconto */}
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className=" font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product))}</h2>
                            {product.discountPercentage > 0 && (
                                <DiscountBadge product={product} />
                            )}
                        </div>
                        {/* Preço original */}
                        {product.discountPercentage > 0 && (
                            <p className=" text-muted-foreground text-sm"> De: {formatCurrency(Number(product.price))}</p>
                        )}
                    </div>
                    {/* Quantidade */}
                    <div className="flex gap-3 items-center text-center">
                        <Button size="icon" variant='ghost' className="border-muted-foreground border border-solid" onClick={handleDecreaseQuantityClick}>
                            <ChevronLeftIcon />
                        </Button>
                        <span className="w-4">{quantity}</span>
                        <Button size="icon" onClick={handleIncreaseQuantityClick}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                {/* Dados da entrega */}
                <div className="px-5">
                    <DeliveryInfo restaurant={product.restaurant} />
                </div>
                <div className="mt-6 space-y-3 px-5">
                    <h3 className="font-semibold ">Sobre</h3>
                    <p className="text-muted-foreground text-sm">{product.description}</p>
                </div>
                <div className="mt-6 space-y-3">
                    <h3 className="font-semibold px-5">Sucos</h3>
                    <ProductList products={complementaryProduct} />
                </div>
                <div className="px-5 mt-6">
                    <Button className="w-full font-semibold" onClick={hundleAddToCartClick}>Adicionar à sacola</Button>
                </div>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="w-[90vw]">
                    <SheetTitle>Sacola</SheetTitle>
                    <Cart />
                </SheetContent>
            </Sheet>
            <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja limpar a sacola?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Você possui itens de outro restaurante, para adicionar esse item precisaremos limpar sua sacola
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>Esvaziar sacola e adicionar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default ProductDetails;