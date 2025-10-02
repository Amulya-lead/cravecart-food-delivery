import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RestaurantCard from "@/components/RestaurantCard";
import { useCartStore } from "@/lib/cartStore";
import { Badge } from "@/components/ui/badge";

// A skeleton component for the loading state to improve UX
const RestaurantCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="flex items-center">
        <div className="h-5 w-5 bg-yellow-300 rounded-full mr-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);


const Index = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [restaurants, setRestaurants] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNearbyRestaurants = async (latitude, longitude) => {
      try {
        // Call your secure serverless function, not the Google API directly
        const response = await fetch(`/.netlify/functions/places?lat=${latitude}&lng=${longitude}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants. Please try again later.');
        }
        const data = await response.json();
        
        // Sort by rating to find the "featured" ones
        const sortedByRating = [...data].sort((a, b) => b.rating - a.rating);
        
        setRestaurants(data);
        setFeaturedRestaurants(sortedByRating.slice(0, 3)); // Feature the top 3
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchNearbyRestaurants(position.coords.latitude, position.coords.longitude);
          },
          () => {
            setError("Unable to retrieve your location. Please enable location services.");
            setIsLoading(false);
            // Fallback: Fetch from a default location (e.g., Hyderabad)
            fetchNearbyRestaurants(17.3850, 78.4867);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={totalItems} />
      <Hero />
      
      {/* Dynamic Restaurant Sections */}
      <main className="container mx-auto px-4 py-12">
        {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}

        {/* Featured Restaurants Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
              : featuredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
          </div>
        </section>

        {/* All Restaurants Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Restaurants Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
              : restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
          </div>
          { !isLoading && restaurants.length === 0 && !error &&
             <p className="text-center col-span-full text-gray-500">No restaurants found nearby.</p>
          }
        </section>
      </main>

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
