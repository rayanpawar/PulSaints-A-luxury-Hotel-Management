import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Hotel, MapPin, Wifi, Car, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hotel-hero.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Hotel,
      title: "Luxury Rooms",
      description: "Comfortable and elegant rooms with modern amenities"
    },
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet access throughout the hotel"
    },
    {
      icon: Car,
      title: "Free Parking",
      description: "Complimentary parking for all our guests"
    },
    {
      icon: Users,
      title: "24/7 Service",
      description: "Round-the-clock customer service and support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-hotel-blue">Azure Hotel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Experience luxury and comfort in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/customer-login")}
              className="text-lg px-8 py-3"
            >
              Book Your Stay
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/admin-login")}
              className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-900"
            >
              Admin Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-hotel-blue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Azure Hotel?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide exceptional service and amenities to make your stay unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="text-center animate-slide-up">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your room today and enjoy our world-class hospitality
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-lg">4.9/5 Guest Rating</span>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/customer-login")}
            className="text-lg px-8 py-3 bg-white text-hotel-blue hover:bg-gray-100"
          >
            Book Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Hotel className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">Azure Hotel</span>
          </div>
          <div className="flex items-center justify-center text-gray-400 mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <span>123 Luxury Avenue, City Center, State 12345</span>
          </div>
          <p className="text-gray-400">
            © 2024 Azure Hotel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;