import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Favorite Food,
            <br />
            Delivered Hot & Fresh
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Order from the best local restaurants with easy, on-demand delivery.
          </p>
          
          <div className="flex gap-2 max-w-2xl mx-auto bg-white rounded-full p-2 shadow-elevated">
            <Input 
              placeholder="Search for restaurants or dishes..."
              className="border-0 focus-visible:ring-0 text-base bg-transparent"
            />
            <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 px-8">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
