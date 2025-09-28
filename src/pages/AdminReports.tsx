import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Download, 
  FileText, 
  BarChart3, 
  Users, 
  DollarSign, 
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Hotel,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AdminReports = () => {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState("revenue");

  // Mock data for reports
  const revenueData = {
    totalRevenue: 145800,
    previousPeriod: 132400,
    growth: 10.1,
    breakdown: [
      { category: "Room Revenue", amount: 98500, percentage: 67.6 },
      { category: "Food & Beverage", amount: 28900, percentage: 19.8 },
      { category: "Services", amount: 18400, percentage: 12.6 }
    ]
  };

  const occupancyData = {
    averageOccupancy: 78.5,
    previousPeriod: 72.3,
    totalRooms: 150,
    occupiedRooms: 118,
    availableRooms: 32,
    roomTypes: [
      { type: "Standard", total: 80, occupied: 65, rate: 81.3 },
      { type: "Deluxe", total: 45, occupied: 34, rate: 75.6 },
      { type: "Suite", total: 25, occupied: 19, rate: 76.0 }
    ]
  };

  const guestData = {
    totalGuests: 1247,
    newGuests: 428,
    returningGuests: 819,
    averageStay: 2.8,
    demographics: [
      { category: "Business", count: 486, percentage: 39.0 },
      { category: "Leisure", count: 573, percentage: 46.0 },
      { category: "Group", count: 188, percentage: 15.0 }
    ]
  };

  const handleDownloadReport = (format: 'pdf' | 'excel') => {
    toast({
      title: "Report Generated",
      description: `${reportType} report downloaded as ${format.toUpperCase()}`,
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Report Sent",
      description: "Report has been sent to your email address.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and download detailed reports</p>
        </div>

        {/* Report Filters */}
        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Select date range and report type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      disabled={(date) => date > new Date() || date < (dateFrom || new Date('1900-01-01'))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue Report</SelectItem>
                    <SelectItem value="occupancy">Occupancy Report</SelectItem>
                    <SelectItem value="guest">Guest Report</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <div className="flex gap-2">
                  <Button onClick={() => handleDownloadReport('pdf')} variant="hero" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button onClick={() => handleDownloadReport('excel')} variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="guest">Guest Analytics</TabsTrigger>
            <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
          </TabsList>
          
          {/* Revenue Report */}
          <TabsContent value="revenue">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{revenueData.growth}% from last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Previous Period</p>
                      <p className="text-2xl font-bold">${revenueData.previousPeriod.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">Comparison baseline</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                      <p className="text-2xl font-bold text-green-600">+{revenueData.growth}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-muted-foreground">Performance indicator</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.category}</h4>
                        <p className="text-sm text-muted-foreground">{item.percentage}% of total revenue</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${item.amount.toLocaleString()}</p>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Occupancy Report */}
          <TabsContent value="occupancy">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Occupancy</p>
                      <p className="text-2xl font-bold">{occupancyData.averageOccupancy}%</p>
                    </div>
                    <Hotel className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+6.2% from last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Occupied Rooms</p>
                      <p className="text-2xl font-bold">{occupancyData.occupiedRooms}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-muted-foreground">Out of {occupancyData.totalRooms} total rooms</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Rooms</p>
                      <p className="text-2xl font-bold">{occupancyData.availableRooms}</p>
                    </div>
                    <Hotel className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-muted-foreground">Ready for booking</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Occupancy by Room Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {occupancyData.roomTypes.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{room.type} Rooms</h4>
                        <p className="text-sm text-muted-foreground">{room.occupied} of {room.total} rooms occupied</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{room.rate.toFixed(1)}%</p>
                        <Badge variant={room.rate > 80 ? "default" : "outline"}>
                          {room.rate > 80 ? "High" : "Moderate"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guest Report */}
          <TabsContent value="guest">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Guests</p>
                      <p className="text-2xl font-bold">{guestData.totalGuests.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">New Guests</p>
                      <p className="text-2xl font-bold">{guestData.newGuests}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Returning Guests</p>
                      <p className="text-2xl font-bold">{guestData.returningGuests}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Stay</p>
                      <p className="text-2xl font-bold">{guestData.averageStay} days</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Guest Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guestData.demographics.map((demo, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{demo.category} Travelers</h4>
                        <p className="text-sm text-muted-foreground">{demo.percentage}% of total guests</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{demo.count.toLocaleString()}</p>
                        <Badge variant="outline">{demo.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comprehensive Report */}
          <TabsContent value="comprehensive">
            <div className="space-y-6">
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>Complete overview of hotel performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">${revenueData.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Hotel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{occupancyData.averageOccupancy}%</p>
                      <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">{guestData.totalGuests.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Guests</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">+{revenueData.growth}%</p>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Generate a comprehensive report with detailed analytics across all metrics
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => handleDownloadReport('pdf')} variant="hero">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report (PDF)
                  </Button>
                  <Button onClick={() => handleDownloadReport('excel')} variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Data (Excel)
                  </Button>
                  <Button onClick={handleEmailReport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Email Report
                  </Button>
                </div>
              </div>
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

export default AdminReports;