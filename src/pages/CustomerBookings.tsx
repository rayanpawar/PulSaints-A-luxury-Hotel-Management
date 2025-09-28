import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Star, Search, Clock, CreditCard, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const CustomerBookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const bookings = [
    {
      id: "BK001",
      roomName: "Deluxe Room",
      roomNumber: "304",
      checkIn: "2024-12-20",
      checkOut: "2024-12-23",
      guests: 2,
      totalAmount: 450,
      status: "confirmed",
      bookingDate: "2024-11-15",
      nights: 3,
      amenities: ["Free WiFi", "AC", "Mini Bar"]
    },
    {
      id: "BK002",
      roomName: "Executive Suite",
      roomNumber: "501",
      checkIn: "2024-12-25",
      checkOut: "2024-12-28",
      guests: 4,
      totalAmount: 897,
      status: "upcoming",
      bookingDate: "2024-11-20",
      nights: 3,
      amenities: ["Free WiFi", "AC", "Mini Bar", "Kitchen", "Living Area"]
    },
    {
      id: "BK003",
      roomName: "Standard Room",
      roomNumber: "205",
      checkIn: "2024-10-15",
      checkOut: "2024-10-18",
      guests: 2,
      totalAmount: 297,
      status: "completed",
      bookingDate: "2024-09-10",
      nights: 3,
      amenities: ["Free WiFi", "AC"]
    },
    {
      id: "BK004",
      roomName: "Deluxe Room",
      roomNumber: "306",
      checkIn: "2024-09-05",
      checkOut: "2024-09-07",
      guests: 2,
      totalAmount: 300,
      status: "completed",
      bookingDate: "2024-08-20",
      nights: 2,
      amenities: ["Free WiFi", "AC", "Mini Bar"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Bookings
          </h1>
          <p className="text-muted-foreground">
            Manage and view your hotel reservations
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by booking ID or room name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
                <p className="text-muted-foreground text-center mb-6">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "You haven't made any bookings yet. Start planning your next stay!"
                  }
                </p>
                <Button variant="hero" onClick={() => navigate("/customer-dashboard")}>
                  Browse Rooms
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} variant="interactive" className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{booking.roomName}</CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span>Booking ID: {booking.id}</span>
                        <span>•</span>
                        <span>Room {booking.roomNumber}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${booking.totalAmount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {booking.nights} night{booking.nights > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Booking Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Check-in</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.checkIn)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Check-out</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.checkOut)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Guests</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">Booked on</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(booking.bookingDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <div className="font-medium text-foreground mb-2">Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {booking.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => navigate(`/invoice?booking=${booking.id}`)}
                    >
                      <FileText className="h-4 w-4" />
                      View Invoice
                    </Button>
                    
                    {booking.status === "upcoming" || booking.status === "confirmed" ? (
                      <>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => navigate(`/checkinout?booking=${booking.id}`)}
                        >
                          <MapPin className="h-4 w-4" />
                          Check-in/out
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => navigate(`/booking?edit=${booking.id}`)}
                        >
                          Modify Booking
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="hero"
                        className="flex items-center gap-2"
                        onClick={() => navigate(`/booking?room=${encodeURIComponent(booking.roomName)}`)}
                      >
                        <Star className="h-4 w-4" />
                        Book Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">
                All time bookings
              </p>
            </CardContent>
          </Card>
          
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime spending
              </p>
            </CardContent>
          </Card>
          
          <Card variant="gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Stays</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings.filter(b => b.status === "upcoming" || b.status === "confirmed").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Future reservations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookings;