import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckoutSuccess = () => {
  const [order, setOrder] = useState<{ totalAmount: string; totalItems: number } | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) setOrder(JSON.parse(savedOrder));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="max-w-md w-full text-center p-6 shadow-lg">
        <CardHeader>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold">
            Order Placed Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {order && (
            <div className="mb-6 space-y-2">
              <p className="text-muted-foreground">
                Total Items: <b>{order.totalItems}</b>
              </p>
              <p className="text-muted-foreground">
                Total Amount: <b>${order.totalAmount}</b>
              </p>
            </div>
          )}

          <p className="text-muted-foreground mb-6">
            Thank you for your order. Your delicious food will arrive soon!
          </p>
          <Link to="/home">
            <Button className="w-full bg-accent hover:bg-accent/90 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
