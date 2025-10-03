import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import { useCartStore } from "@/lib/cartStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  delivery_time: string;
  delivery_fee: number;
  latitude: number;
  longitude: number;
}

const Restaurants = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      // Fetch nearby restaurants from Supabase
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .gte("latitude", userLat - 0.05)
        .lte("latitude", userLat + 0.05)
        .gte("longitude", userLng - 0.05)
        .lte("longitude", userLng + 0.05);

      if (error) console.error(error);
      else setRestaurants(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Nearby Restaurants</h1>

        {loading ? (
          <p>Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p>No restaurants found near your location.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent>
                    <CardTitle className="text-lg font-bold">{restaurant.name}</CardTitle>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{restaurant.cuisine}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {restaurant.delivery_time} | ${restaurant.delivery_fee} delivery
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
