import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RestaurantCard from "@/components/RestaurantCard";
import { restaurants, cuisines } from "@/lib/mockData";
import { useCartStore } from "@/lib/cartStore";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const featuredRestaurants = restaurants.filter((r) => r.featured);

  return (
    <div className="min-h-screen">
      <Header cartItemCount={totalItems} />
      <Hero />
      
      {/* Popular Cuisines */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Popular Cuisines</h2>
        <div className="flex flex-wrap gap-3">
          {cuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant="secondary"
              className="px-6 py-3 text-base cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-3xl font-bold mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* All Restaurants */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">All Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get 50% off your first order!
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Use code CRAVE50 at checkout
          </p>
          <Badge className="bg-white text-primary hover:bg-white/90 text-lg px-6 py-3">
            CRAVE50
          </Badge>
        </div>
      </section>
    </div>
  );
};

export default Index;
