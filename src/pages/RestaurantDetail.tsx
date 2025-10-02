import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import MenuItemCard from "@/components/MenuItemCard";
import { restaurants, menuItems } from "@/lib/mockData";
import { useCartStore } from "@/lib/cartStore";
import { Star, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (!restaurant) {
    return (
      <div className="min-h-screen">
        <Header cartItemCount={totalItems} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Restaurant not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const restaurantMenu = menuItems.filter((item) => item.restaurantId === id);
  const categories = [...new Set(restaurantMenu.map((item) => item.category))];

  const handleAddItem = (item: any) => {
    addItem(item);
    toast.success(`Added ${item.name} to cart`);
  };

  const handleRemoveItem = (item: any) => {
    removeItem(item.id);
    toast.info(`Removed ${item.name} from cart`);
  };

  return (
    <div className="min-h-screen">
      <Header cartItemCount={totalItems} />
      
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{restaurant.cuisine}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-lg">{restaurant.rating}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span>${restaurant.deliveryFee} delivery fee</span>
                </div>
              </div>
            </div>
            
            {restaurant.featured && (
              <Badge className="bg-accent text-lg px-4 py-2">Featured</Badge>
            )}
          </div>
        </div>

        {/* Menu */}
        <div className="pb-20">
          <h2 className="text-3xl font-bold mb-6">Menu</h2>
          
          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-primary">{category}</h3>
              <div className="space-y-4">
                {restaurantMenu
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const cartItem = items.find((i) => i.id === item.id);
                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={cartItem?.quantity || 0}
                        onAdd={handleAddItem}
                        onRemove={handleRemoveItem}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
