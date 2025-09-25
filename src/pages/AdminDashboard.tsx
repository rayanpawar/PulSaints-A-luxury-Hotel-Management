import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Hotel, 
  AlertCircle,
  Download,
  Plus,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "+5%",
      icon: Hotel,
      trend: "up",
      color: "text-hotel-success"
    },
    {
      title: "Total Revenue",
      value: "$24,540",
      change: "+12%",
      icon: DollarSign,
      trend: "up",
      color: "text-hotel-success"
    },
    {
      title: "Active Bookings",
      value: "42",
      change: "+3",
      icon: Calendar,
      trend: "up",
      color: "text-hotel-success"
    },
    {
      title: "Total Guests",
      value: "156",
      change: "+8%",
      icon: Users,
      trend: "up",
      color: "text-hotel-success"
    }
  ];

  const recentBookings = [
    {
      id: "BK001",
      guest: "John Smith",
      room: "Deluxe Room 301",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed",
      amount: "$450"
    },
    {
      id: "BK002", 
      guest: "Sarah Johnson",
      room: "Suite 501",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      status: "pending",
      amount: "$1,200"
    },
    {
      id: "BK003",
      guest: "Mike Wilson",
      room: "Standard Room 201",
      checkIn: "2024-01-17",
      checkOut: "2024-01-19",
      status: "confirmed", 
      amount: "$198"
    }
  ];

  const alerts = [
    {
      type: "maintenance",
      message: "Room 205 AC requires maintenance",
      time: "2 hours ago",
      priority: "high"
    },
    {
      type: "booking",
      message: "New booking received for Executive Suite",
      time: "4 hours ago",
      priority: "medium"
    },
    {
      type: "checkout",
      message: "Guest checkout pending for Room 307",
      time: "6 hours ago",
      priority: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-hotel-success";
      case "pending":
        return "bg-hotel-warning";
      case "cancelled":
        return "bg-destructive";
      default:
        return "bg-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-hotel-warning";
      case "low":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of hotel operations and performance
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="hero" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs flex items-center gap-1 ${stat.color}`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.change} from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card variant="default">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate("/admin-bookings")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
                <CardDescription>
                  Latest room reservations and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{booking.guest}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.room}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {booking.checkIn} → {booking.checkOut}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium">{booking.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications/Alerts */}
          <div>
            <Card variant="default">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Alerts & Notifications
                </CardTitle>
                <CardDescription>
                  Important updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex gap-3 p-3 border rounded-lg">
                      <AlertCircle className={`h-4 w-4 mt-0.5 ${getPriorityColor(alert.priority)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="gradient" className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin-rooms")}
                >
                  <Hotel className="h-4 w-4 mr-2" />
                  Manage Rooms
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/admin-reports")}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Guest Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;