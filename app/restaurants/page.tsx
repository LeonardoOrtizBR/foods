'use client'

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    const searchParams = useSearchParams()

    const searchFor = searchParams.get('search')

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!searchFor) return
            const foundRestaurant = await searchForRestaurant(searchFor)
            setRestaurants(foundRestaurant)
        }
        fetchRestaurants()
    }, [searchFor])

    if (!searchFor) {
        return notFound()
    }

    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <h2 className="mb-6 text-lg font-semibold">Restautantes Encontrados</h2>
                <div className=" flex w-full flex-col gap-6 space-y-4">
                    {restaurants.map(restaurant => <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full" />)}
                </div>
            </div>
        </>
    );
}

export default Restaurants;