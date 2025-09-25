import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Wifi,
  Car,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import deluxeRoom from "@/assets/deluxe-room.jpg";
import standardRoom from "@/assets/standard-room.jpg";
import suiteRoom from "@/assets/suite-room.jpg";
import { toast } from "@/hooks/use-toast";

const AdminRooms = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const rooms = [
    {
      id: 1,
      number: "101",
      name: "Standard Room",
      type: "Standard",
      price: 99,
      image: standardRoom,
      capacity: 2,
      amenities: ["Free WiFi", "AC", "TV"],
      status: "available",
      lastCleaned: "2024-01-15",
      floor: 1
    },
    {
      id: 2,
      number: "201",
      name: "Deluxe Room",
      type: "Deluxe",
      price: 150,
      image: deluxeRoom,
      capacity: 2,
      amenities: ["Free WiFi", "AC", "Mini Bar", "City View"],
      status: "occupied",
      lastCleaned: "2024-01-14",
      floor: 2
    },
    {
      id: 3,
      number: "301",
      name: "Executive Suite",
      type: "Suite",
      price: 299,
      image: suiteRoom,
      capacity: 4,
      amenities: ["Free WiFi", "AC", "Mini Bar", "Kitchen", "Living Area"],
      status: "maintenance",
      lastCleaned: "2024-01-13",
      floor: 3
    },
    {
      id: 4,
      number: "102",
      name: "Standard Room",
      type: "Standard",
      price: 99,
      image: standardRoom,
      capacity: 2,
      amenities: ["Free WiFi", "AC", "TV"],
      status: "available",
      lastCleaned: "2024-01-15",
      floor: 1
    }
  ];

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.number.includes(searchTerm) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-hotel-success text-white";
      case "occupied":
        return "bg-hotel-warning text-white";
      case "maintenance":
        return "bg-destructive text-white";
      case "cleaning":
        return "bg-hotel-blue text-white";
      default:
        return "bg-secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "occupied":
        return "Occupied";
      case "maintenance":
        return "Maintenance";
      case "cleaning":
        return "Cleaning";
      default:
        return status;
    }
  };

  const handleDeleteRoom = (roomId: number) => {
    toast({
      title: "Room Deleted",
      description: "Room has been successfully removed from the system.",
    });
  };

  const handleEditRoom = (roomId: number) => {
    toast({
      title: "Edit Room",
      description: "Redirecting to edit room details...",
    });
  };

  const statusCounts = {
    available: rooms.filter(r => r.status === "available").length,
    occupied: rooms.filter(r => r.status === "occupied").length,
    maintenance: rooms.filter(r => r.status === "maintenance").length,
    total: rooms.length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Room Management
            </h1>
            <p className="text-muted-foreground">
              Manage hotel rooms, pricing, and availability
            </p>
          </div>
          <Button variant="hero" className="flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="h-4 w-4" />
            Add New Room
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{statusCounts.total}</div>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-hotel-success">{statusCounts.available}</div>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-hotel-warning">{statusCounts.occupied}</div>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </CardContent>
          </Card>
          <Card variant="gradient">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-destructive">{statusCounts.maintenance}</div>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rooms by number, type, or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} variant="elevated" className="overflow-hidden">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(room.status)}>
                    {getStatusText(room.status)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-xs font-medium">#{room.number}</span>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Floor {room.floor} • Room {room.number}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      ${room.price}
                    </div>
                    <div className="text-xs text-muted-foreground">per night</div>
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
                    <span>WiFi</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{room.amenities.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  Last cleaned: {room.lastCleaned}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEditRoom(room.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteRoom(room.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;