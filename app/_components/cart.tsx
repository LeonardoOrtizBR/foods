import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
    const { products, subtotalPrice, totalPrice, totalDiscounts } = useContext(CartContext)
    return (
        <div className="py-5">
            <div className=" space-y-4">
                {products.map(product =>
                    <CartItem key={product.id} cartProduct={product} />
                )}
            </div>
            {/* totais */}
            <div className="mt-6">
                <Card>
                    <CardContent className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatCurrency(subtotalPrice)}</span>
                        </div>
                        <Separator className="h-[0.5px] bg-[#EEEEEE]" />
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Descontos</span>
                            <span>-{formatCurrency(totalDiscounts)}</span>
                        </div>
                        <Separator className="h-[0.5px] bg-[#EEEEEE]" />
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Entrega</span>
                            {Number(products[0].restaurant.deliveryFee) === 0 ? <span className="uppercase text-primary">Gratís</span> : formatCurrency(Number(products[0].restaurant.deliveryFee))}
                        </div>
                        <Separator className="h-[0.5px] bg-[#EEEEEE]" />
                        <div className="flex items-center justify-between text-xs font-semibold">
                            <span>Total</span>
                            <span>{formatCurrency(totalPrice)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* finalizar pedido */}
            <Button className="w-full mt-6">Finalizar pedido</Button>
        </div>
    );
}

export default Cart;