import Header from "@/components/Header";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getCartTotal());

  const deliveryFee = 2.99;
  const tax = totalPrice * 0.1;
  const total = totalPrice + deliveryFee + tax;

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_RFPjS89YJb6J7f", // Replace with your Razorpay key
      amount: Math.round(total * 100), // in paise
      currency: "USD",
      name: "CraveCart",
      description: "Food Order Payment",
      handler: function (response: any) {
        const orderData = {
          totalItems,
          totalAmount: total.toFixed(2),
        };
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        clearCart();
        window.location.href = "/checkout-success";
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3b82f6" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header cartItemCount={totalItems} />
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <Card className="text-center py-20">
            <CardContent>
              <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some delicious items to get started!
              </p>
              <Link to="/">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Browse Restaurants
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Cart Items</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      clearCart();
                      toast.info("Cart cleared");
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => removeItem(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => addItem(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90"
                    onClick={handlePayment}
                  >
                    Proceed to Checkout
                  </Button>
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
