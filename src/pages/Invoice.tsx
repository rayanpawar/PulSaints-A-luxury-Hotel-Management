import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/enhanced-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Mail, 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard,
  Hotel,
  CheckCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Invoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || {
    id: "BK001",
    roomNumber: "101",
    roomType: "Deluxe Room",
    status: "checked-out",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 2,
    guestName: "John Doe",
    amount: 597,
    services: ["WiFi", "Parking", "Breakfast", "Room Service"]
  };

  const invoiceData = {
    invoiceNumber: `INV-${booking.id}-2024`,
    issueDate: new Date().toLocaleDateString(),
    dueDate: new Date().toLocaleDateString(),
    guestEmail: "john.doe@example.com",
    guestPhone: "+1 (555) 123-4567",
    guestAddress: "123 Main Street, New York, NY 10001",
    nights: Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)),
    roomRate: 199,
    services: [
      { name: "WiFi", price: 0 },
      { name: "Parking", price: 25 },
      { name: "Breakfast", price: 35 },
      { name: "Room Service", price: 45 }
    ],
    taxes: 89.55,
    total: 597
  };

  const handleDownload = () => {
    toast({
      title: "Invoice Downloaded",
      description: "Your invoice has been downloaded as PDF.",
    });
  };

  const handleEmailInvoice = () => {
    toast({
      title: "Invoice Sent",
      description: "Invoice has been sent to your email address.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Invoice</h1>
                <p className="text-muted-foreground">{invoiceData.invoiceNumber}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleEmailInvoice} variant="hero">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Invoice
                </Button>
              </div>
            </div>
          </div>

          <Card variant="elevated">
            <CardContent className="p-8">
              {/* Hotel Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Hotel className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary">PulSaints</h2>
                    <p className="text-muted-foreground">Luxury Accommodation & Services</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">123 Hotel Boulevard</p>
                  <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">{invoiceData.guestEmail}</p>
                    <p className="text-sm text-muted-foreground">{invoiceData.guestPhone}</p>
                    <p className="text-sm text-muted-foreground">{invoiceData.guestAddress}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Invoice Details:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Invoice Number:</span>
                      <span className="text-sm font-medium">{invoiceData.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Issue Date:</span>
                      <span className="text-sm">{invoiceData.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Status:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Stay Information:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Room {booking.roomNumber}</p>
                      <p className="text-xs text-muted-foreground">{booking.roomType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-xs text-muted-foreground">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-xs text-muted-foreground">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{booking.guests} Guest(s)</p>
                      <p className="text-xs text-muted-foreground">{invoiceData.nights} Night(s)</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Itemized Bill */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Itemized Bill:</h3>
                <div className="space-y-4">
                  {/* Room Charges */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{booking.roomType}</p>
                      <p className="text-sm text-muted-foreground">{invoiceData.nights} nights × ${invoiceData.roomRate}/night</p>
                    </div>
                    <span className="font-medium">${(invoiceData.nights * invoiceData.roomRate).toFixed(2)}</span>
                  </div>

                  {/* Services */}
                  {invoiceData.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">Service charge</p>
                      </div>
                      <span className="font-medium">
                        {service.price === 0 ? "Complimentary" : `$${service.price.toFixed(2)}`}
                      </span>
                    </div>
                  ))}

                  <Separator />

                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span>Subtotal:</span>
                    <span>${(invoiceData.total - invoiceData.taxes).toFixed(2)}</span>
                  </div>

                  {/* Taxes */}
                  <div className="flex justify-between items-center">
                    <span>Taxes & Fees (15%):</span>
                    <span>${invoiceData.taxes.toFixed(2)}</span>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total Amount:</span>
                    <span>${invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Payment Method:</p>
                    <p className="text-sm text-muted-foreground">Credit Card ending in 3456</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transaction ID:</p>
                    <p className="text-sm text-muted-foreground">TXN-{booking.id}-2024</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Date:</p>
                    <p className="text-sm text-muted-foreground">{invoiceData.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Payment Successful
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Thank you for choosing PulSaints!</p>
                <p>For any questions regarding this invoice, please contact us at billing@pulsaints.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 text-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/checkinout")}
              className="text-muted-foreground"
            >
              ← Back to Check-in/Out
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/customer-dashboard")}
              className="text-muted-foreground"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;