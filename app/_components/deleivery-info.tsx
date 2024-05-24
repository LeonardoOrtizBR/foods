import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Restaurant } from "@prisma/client";

interface DeleiveryInfoProps {
    restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}

const DeliveryInfo = ({ restaurant }: DeleiveryInfoProps) => {
    return (
        <>
            <Card className="flex justify-around py-3 mt-6">
                {/* Custo de entrega */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Entrega</span>
                        <BikeIcon size={14} />
                    </div>
                    {Number(restaurant.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            {formatCurrency(Number(restaurant.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold">
                            Grátis
                        </p>
                    )}
                </div>
                {/* tempo de entrega */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Tempo</span>
                        <TimerIcon size={14} />
                    </div>
                    <p className="text-xs font-semibold">
                        {restaurant.deliveryTimeMinutes} min
                    </p>
                </div>
            </Card>
        </>
    );
}

export default DeliveryInfo;