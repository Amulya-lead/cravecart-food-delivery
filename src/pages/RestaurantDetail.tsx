import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import MenuItemCard from "@/components/MenuItemCard";
import { useCartStore } from "@/lib/cartStore";
import { Star, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  delivery_time: string;
  delivery_fee: number;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const { data: restaurantData, error: restError } = await supabase
        .from("restaurants")
        .select("*")
        .eq("id", id)
        .single();

      if (restError || !restaurantData) {
        toast.error("Restaurant not found");
        setLoading(false);
        return;
      }

      setRestaurant(restaurantData);

      const { data: menuData, error: menuError } = await supabase
        .from("menu_items")
        .select("*")
        .eq("restaurant_id", id);

      if (menuError) console.error(menuError);
      else setMenuItems(menuData || []);

      setLoading(false);
    };

    fetchRestaurantData();
  }, [id]);

  const handleAddItem = (item: MenuItem) => {
    addItem(item);
    toast.success(`Added ${item.name} to cart`);
  };

  const handleRemoveItem = (item: MenuItem) => {
    removeItem(item.id);
    toast.info(`Removed ${item.name} from cart`);
  };

  if (loading) return <p>Loading...</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="min-h-screen">
      <Header cartItemCount={totalItems} />

      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Link to="/restaurants">
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
                  <span>{restaurant.delivery_time}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-5 w-5" />
                  <span>${restaurant.delivery_fee} delivery fee</span>
                </div>
              </div>
            </div>
            <Badge className="bg-accent text-lg px-4 py-2">Featured</Badge>
          </div>
        </div>

        {/* Menu */}
        <div className="pb-20">
          <h2 className="text-3xl font-bold mb-6">Menu</h2>
          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-primary">{category}</h3>
              <div className="space-y-4">
                {menuItems
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
