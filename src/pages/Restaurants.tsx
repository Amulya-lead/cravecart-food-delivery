import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Restaurant {
  id: string;
  name: string;
  cuisine?: string;
}

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("restaurants")
        .select("*");

      if (error) {
        console.error("Error fetching restaurants:", error.message);
        setLoading(false);
        return;
      }

      // Remove duplicates based on id
      const uniqueRestaurants = data.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );

      setRestaurants(uniqueRestaurants);
      setLoading(false);
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading restaurants...</p>;

  if (restaurants.length === 0)
    return <p className="text-center mt-10">No restaurants found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{restaurant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {restaurant.cuisine ? restaurant.cuisine.replace(/;/g, ", ") : "Not specified"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Restaurants;
