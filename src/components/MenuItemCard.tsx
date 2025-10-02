import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/lib/mockData";

interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd: (item: MenuItem) => void;
  onRemove?: (item: MenuItem) => void;
}

const MenuItemCard = ({ item, quantity = 0, onAdd, onRemove }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-300">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>
          <p className="font-bold text-lg text-primary">${item.price.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-col items-center justify-between">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          
          {quantity > 0 ? (
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full"
                onClick={() => onRemove?.(item)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold w-6 text-center">{quantity}</span>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full bg-primary"
                onClick={() => onAdd(item)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="mt-2 rounded-full bg-accent hover:bg-accent/90"
              onClick={() => onAdd(item)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard
