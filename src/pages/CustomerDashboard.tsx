import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Wifi, Car, Star, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import deluxeRoom from "@/assets/deluxe-room.jpg";
import standardRoom from "@/assets/standard-room.jpg";
import suiteRoom from "@/assets/suite-room.jpg";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      price: 150,
      image: deluxeRoom,
      capacity: 2,
      amenities: ["Free WiFi", "AC", "Mini Bar"],
      available: true,
      rating: 4.8,
      description: "Spacious room with city view and modern amenities"
    },
    {
      id: 2,
      name: "Standard Room",
      price: 99,
      image: standardRoom,
      capacity: 2,
      amenities: ["Free WiFi", "AC"],
      available: true,
      rating: 4.5,
      description: "Comfortable room with essential amenities"
    },
    {
      id: 3,
      name: "Executive Suite",
      price: 299,
      image: suiteRoom,
      capacity: 4,
      amenities: ["Free WiFi", "AC", "Mini Bar", "Kitchen", "Living Area"],
      available: false,
      rating: 4.9,
      description: "Luxurious suite with separate living area and premium amenities"
    }
  ];

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookRoom = (roomId: number) => {
    navigate(`/customer-booking/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Find the perfect room for your stay
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check In
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Check Out
                </Button>
                <Button variant="hero">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} variant="interactive" className="overflow-hidden">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={room.available ? "default" : "destructive"}>
                    {room.available ? "Available" : "Booked"}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{room.rating}</span>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {room.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${room.price}
                    </div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>Free WiFi</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button
                  variant={room.available ? "hero" : "outline"}
                  className="w-full"
                  disabled={!room.available}
                  onClick={() => handleBookRoom(room.id)}
                >
                  {room.available ? "Book Now" : "Not Available"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,430</div>
              <p className="text-xs text-muted-foreground">
                570 points to next tier
              </p>
            </CardContent>
          </Card>
          
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Stay</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dec 25</div>
              <p className="text-xs text-muted-foreground">
                Deluxe Room - 3 nights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;