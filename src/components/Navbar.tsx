import { Button } from "@/components/ui/enhanced-button";
import { Hotel, User, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <Hotel className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-foreground">
              PulSaints
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {location.pathname === "/" && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/customer-login")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Customer Login
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin-login")}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Admin Login
                </Button>
              </>
            )}

            {location.pathname.includes("/customer") && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/customer-dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/customer-bookings")}
                >
                  My Bookings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Logout
                </Button>
              </div>
            )}

            {location.pathname.includes("/admin") && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin-rooms")}
                >
                  Rooms
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/admin-reports")}
                >
                  Reports
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;