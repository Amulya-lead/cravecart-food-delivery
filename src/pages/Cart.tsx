import Header from "@/components/Header";
import { useCartStore } from "@/lib/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const deliveryFee = 2.99;
  const tax = totalPrice * 0.1;
  const total = totalPrice + deliveryFee + tax;

  const handleCheckout = () => {
    toast.success("Order placed successfully! (Demo checkout)");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <Card className="text-center py-20">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <Button onClick={() => window.location.href = "/restaurants"}>Browse Restaurants</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex justify-between">
                  <CardTitle>Cart Items</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => { clearCart(); toast.info("Cart cleared"); }}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => removeItem(item.id)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <Button size="icon" onClick={() => addItem(item)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    This is a demo checkout. No actual payment will be processed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
