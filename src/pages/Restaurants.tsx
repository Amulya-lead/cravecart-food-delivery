import { useState } from "react";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, cuisines } from "@/lib/mockData";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

const Restaurants = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const filteredRestaurants = restaurants
    .filter((r) => selectedCuisine === "all" || r.cuisine === selectedCuisine)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "deliveryTime") {
        const aTime = parseInt(a.deliveryTime.split("-")[0]);
        const bTime = parseInt(b.deliveryTime.split("-")[0]);
        return aTime - bTime;
      }
      if (sortBy === "deliveryFee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

  return (
    <div className="min-h-screen">
      <Header cartItemCount={totalItems} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Restaurants Near You</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card rounded-lg shadow-card">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
              <SelectItem value="deliveryFee">Lowest Fee</SelectItem>
            </SelectContent>
          </Select>
          
          {(selectedCuisine !== "all" || sortBy !== "rating") && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedCuisine("all");
                setSortBy("rating");
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No restaurants found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
