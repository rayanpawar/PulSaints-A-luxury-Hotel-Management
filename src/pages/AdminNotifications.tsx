import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Settings,
  Mail,
  Smartphone,
  Monitor
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [notificationSettings, setNotificationSettings] = useState({
    newBookings: true,
    cancellations: true,
    checkIns: true,
    checkOuts: false,
    maintenanceAlerts: true,
    lowInventory: true,
    dailyReports: true,
    weeklyReports: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Received",
      message: "Room 205 (Deluxe) booked by Sarah Johnson for Jan 20-22",
      time: "5 minutes ago",
      priority: "high",
      read: false,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "checkin",
      title: "Guest Check-in",
      message: "John Doe has checked into Room 101",
      time: "15 minutes ago",
      priority: "medium",
      read: false,
      icon: Users,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "alert",
      title: "Maintenance Alert",
      message: "Room 308 - Air conditioning unit requires service",
      time: "1 hour ago",
      priority: "high",
      read: true,
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Received",
      message: "$597 payment confirmed for booking BK001",
      time: "2 hours ago",
      priority: "medium",
      read: true,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      id: 5,
      type: "checkout",
      title: "Guest Check-out",
      message: "Room 205 checkout completed by Sarah Wilson",
      time: "3 hours ago",
      priority: "low",
      read: true,
      icon: CheckCircle,
      color: "text-blue-600"
    },
    {
      id: 6,
      type: "booking",
      title: "Booking Cancellation",
      message: "Booking BK003 cancelled by guest - refund processed",
      time: "4 hours ago",
      priority: "medium",
      read: true,
      icon: AlertTriangle,
      color: "text-orange-600"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    // In a real app, this would update the backend
    toast({
      title: "Notification Marked as Read",
      description: "Notification status updated successfully.",
    });
  };

  const handleMarkAllAsRead = () => {
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    });
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Manage alerts and notification preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </span>
              </div>
              <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                Mark All as Read
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* All Notifications */}
          <TabsContent value="all">
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notification.priority)}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Unread Notifications */}
          <TabsContent value="unread">
            <div className="space-y-4">
              {notifications.filter(n => !n.read).map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card key={notification.id} className="border-primary/50 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notification.priority)}
                              <Button
                                size="sm"
                                variant="hero"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as Read
                              </Button>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* High Priority */}
          <TabsContent value="high">
            <div className="space-y-4">
              {notifications.filter(n => n.priority === 'high').map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card key={notification.id} className="border-red-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notification.priority)}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Today's Notifications */}
          <TabsContent value="today">
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              {getPriorityBadge(notification.priority)}
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Notification Types */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Notification Types
                  </CardTitle>
                  <CardDescription>
                    Choose which notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Booking & Guest Activities</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="newBookings">New Bookings</Label>
                          <Switch
                            id="newBookings"
                            checked={notificationSettings.newBookings}
                            onCheckedChange={(checked) => handleSettingChange('newBookings', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="cancellations">Cancellations</Label>
                          <Switch
                            id="cancellations"
                            checked={notificationSettings.cancellations}
                            onCheckedChange={(checked) => handleSettingChange('cancellations', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="checkIns">Check-ins</Label>
                          <Switch
                            id="checkIns"
                            checked={notificationSettings.checkIns}
                            onCheckedChange={(checked) => handleSettingChange('checkIns', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="checkOuts">Check-outs</Label>
                          <Switch
                            id="checkOuts"
                            checked={notificationSettings.checkOuts}
                            onCheckedChange={(checked) => handleSettingChange('checkOuts', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">System & Reports</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="maintenanceAlerts">Maintenance Alerts</Label>
                          <Switch
                            id="maintenanceAlerts"
                            checked={notificationSettings.maintenanceAlerts}
                            onCheckedChange={(checked) => handleSettingChange('maintenanceAlerts', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="lowInventory">Low Inventory</Label>
                          <Switch
                            id="lowInventory"
                            checked={notificationSettings.lowInventory}
                            onCheckedChange={(checked) => handleSettingChange('lowInventory', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="dailyReports">Daily Reports</Label>
                          <Switch
                            id="dailyReports"
                            checked={notificationSettings.dailyReports}
                            onCheckedChange={(checked) => handleSettingChange('dailyReports', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="weeklyReports">Weekly Reports</Label>
                          <Switch
                            id="weeklyReports"
                            checked={notificationSettings.weeklyReports}
                            onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Methods */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Delivery Methods</CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <div>
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                        </div>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-purple-600" />
                        <div>
                          <Label htmlFor="pushNotifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications in browser</p>
                        </div>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin-dashboard")}
            className="text-muted-foreground"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;