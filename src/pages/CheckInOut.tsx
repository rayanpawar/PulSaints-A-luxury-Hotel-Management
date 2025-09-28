import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  CheckCircle,
  AlertCircle,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CheckInOut = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock booking data
  const mockBookings = [
    {
      id: "BK001",
      roomNumber: "101",
      roomType: "Deluxe Room",
      status: "confirmed",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      guests: 2,
      guestName: "John Doe",
      amount: 597,
      services: ["WiFi", "Parking", "Breakfast", "Room Service"]
    },
    {
      id: "BK002", 
      roomNumber: "205",
      roomType: "Suite",
      status: "checked-in",
      checkIn: "2024-01-14",
      checkOut: "2024-01-16",
      guests: 1,
      guestName: "Jane Smith",
      amount: 798,
      services: ["WiFi", "Breakfast"]
    }
  ];

  const handleSearch = () => {
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      toast({
        title: "Booking Found",
        description: `Found booking for ${booking.guestName}`,
      });
    } else {
      toast({
        title: "Booking Not Found",
        description: "Please check your booking ID and try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSelectedBooking({...selectedBooking, status: "checked-in"});
      toast({
        title: "Check-in Successful",
        description: "Welcome to PulSaints! Enjoy your stay.",
      });
    }, 1500);
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSelectedBooking({...selectedBooking, status: "checked-out"});
      toast({
        title: "Check-out Complete",
        description: "Thank you for staying with us!",
      });
      navigate("/invoice", { state: { booking: selectedBooking } });
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Confirmed</Badge>;
      case "checked-in":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Checked In</Badge>;
      case "checked-out":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Checked Out</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case "WiFi":
        return <Wifi className="h-4 w-4" />;
      case "Parking":
        return <Car className="h-4 w-4" />;
      case "Breakfast":
        return <Coffee className="h-4 w-4" />;
      case "Room Service":
        return <Utensils className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Check-in & Check-out</h1>
          <p className="text-muted-foreground">Manage your arrival and departure</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Your Booking
              </CardTitle>
              <CardDescription>
                Enter your booking ID to view check-in/check-out options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input
                    id="bookingId"
                    placeholder="Enter booking ID (e.g., BK001)"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} variant="hero">
                    Search Booking
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          {selectedBooking && (
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>ID: {selectedBooking.id}</CardDescription>
                  </div>
                  {getStatusBadge(selectedBooking.status)}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Booking Info</TabsTrigger>
                    <TabsTrigger value="actions">Check-in/Out</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6">
                    {/* Guest Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Guest Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedBooking.guestName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedBooking.guests} Guest(s)</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Room Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Room {selectedBooking.roomNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedBooking.roomType}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stay Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Stay Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Check-in: {new Date(selectedBooking.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Check-out: {new Date(selectedBooking.checkOut).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Included Services</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedBooking.services.map((service: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                            {getServiceIcon(service)}
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="actions" className="space-y-6">
                    <div className="text-center space-y-6">
                      {selectedBooking.status === "confirmed" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-blue-600">
                            <Clock className="h-5 w-5" />
                            <span className="font-medium">Ready for Check-in</span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Your room is ready! You can check in now.
                          </p>
                          <Button 
                            onClick={handleCheckIn}
                            disabled={isLoading}
                            variant="hero"
                            size="lg"
                            className="w-full max-w-md"
                          >
                            {isLoading ? "Processing..." : "Check In Now"}
                          </Button>
                        </div>
                      )}

                      {selectedBooking.status === "checked-in" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium">Currently Checked In</span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Enjoy your stay! You can check out when ready.
                          </p>
                          <Button 
                            onClick={handleCheckOut}
                            disabled={isLoading}
                            variant="hero"
                            size="lg"
                            className="w-full max-w-md"
                          >
                            {isLoading ? "Processing..." : "Check Out"}
                          </Button>
                        </div>
                      )}

                      {selectedBooking.status === "checked-out" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">Checked Out</span>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Thank you for staying with us! We hope you enjoyed your visit.
                          </p>
                          <Button 
                            onClick={() => navigate("/invoice", { state: { booking: selectedBooking } })}
                            variant="outline"
                            size="lg"
                            className="w-full max-w-md"
                          >
                            View Invoice
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/customer-dashboard")}
              className="text-muted-foreground"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;