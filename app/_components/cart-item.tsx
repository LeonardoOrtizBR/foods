import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
    const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext)

    const handleDecreaseQuantityClick = () => decreaseProductQuantity(cartProduct.id)
    const handleIncreaseQuantityClick = () => increaseProductQuantity(cartProduct.id)
    const hanbdleRemoveClick = () => removeProductFromCart(cartProduct.id)

    return (
        <div className="flex items-center justify-between">
            {/* imagem e info */}
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 relative">
                    <Image src={cartProduct.imageUrl} alt={cartProduct.name} fill className="rounded-lg object-cover" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xs">{cartProduct.name}</h3>
                    <div className="flex items-center gap-1">
                        <h4 className="text-sm font-semibold">
                            {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
                        </h4>
                        {cartProduct.discountPercentage > 0 && (
                            <span className="text-xs line-through text-muted-foreground">
                                {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
                            </span>
                        )}
                    </div>
                    {/* quantidade */}
                    <div className="flex items-center text-center">
                        <Button size="icon" variant='ghost' className="border-muted-foreground border border-solid h-7 w-7">
                            <ChevronLeftIcon size={16} onClick={handleDecreaseQuantityClick} />
                        </Button>
                        <span className="w-8 text-xs">{cartProduct.quantity}</span>
                        <Button size="icon" className="h-7 w-7" onClick={handleIncreaseQuantityClick}>
                            <ChevronRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* botao de deletar */}
            <Button size='icon' variant='ghost' className="border-muted-foreground border border-solid h-7 w-7" onClick={hanbdleRemoveClick}>
                <TrashIcon size={16} />
            </Button>
        </div>
    );
}

export default CartItem;