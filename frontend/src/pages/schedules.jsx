import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSushis } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Schedules() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [scheduleItems] = useState([
    {
      id: 1,
      title: "Kingsbury Hotel Delivery",
      description: "Daily fresh fish delivery to Colombo kingsbury hotel",
      route: "Galle → Colombo",
      frequency: "Once a Week",
      status: "active",
      startTime: "04:30 AM",
      endTime: "08:00 AM",
      driver: "Kamal Perera",
      vehicle: "Refrigerated Truck (WP-CA-7890)",
      contact: "+94 76 123 4567",
    },
    {
      id: 2,
      title: "Amariyo Colombo Hotel Delivery",
      description: "Daily fresh fish delivery to amariyo colombo hotel",
      route: "matara → Colombo",
      frequency: "Once a Week",
      status: "active",
      startTime: "05:30 AM",
      endTime: "07:45 AM",
      driver: "Jagath Munasinghe",
      vehicle: "Refrigerated Truck (WP-CB-7855)",
      contact: "+94 76 678 4533",
    },
    {
      id: 3,
      title: "Local Distribution",
      description: "Distribution to Kandy and surrounding areas",
      route: "Colombo → Kandy → Matale → Dambulla",
      frequency: "Every Tuesday & Friday",
      status: "pending",
      startTime: "06:00 AM",
      endTime: "04:00 PM",
      driver: "Sunil Rathnayake",
      vehicle: "Refrigerated Van (WP-KD-4567)",
      contact: "+94 76 345 6789",
    },
    {
      id: 4,
      title: "Northern Route",
      description: "Monthly dry goods delivery to Jaffna",
      route: "Colombo → Anuradhapura → Vavuniya → Jaffna",
      frequency: "Monthly (First Monday)",
      status: "pending",
      startTime: "05:00 AM",
      endTime: "08:00 PM",
      driver: "Rajiv Suresh",
      vehicle: "Truck (NP-JF-1234)",
      contact: "+94 76 456 7890",
    },
    {
      id: 5,
      title: "Special Tourist Delivery",
      description: "Premium delivery to resort hotels",
      route: "Colombo → Bentota → Hikkaduwa → Galle",
      frequency: "Daily (Except Sundays)",
      status: "active",
      startTime: "03:00 AM",
      endTime: "09:00 AM",
      driver: "Amila Bandara",
      vehicle: "Premium Refrigerated Van (WP-GQ-9876)",
      contact: "+94 76 567 8901",
    },
    {
      id: 6,
      title: "Eastern Province Delivery",
      description: "Distribution to Batticaloa and Trincomalee",
      route: "Colombo → Polonnaruwa → Batticaloa → Trincomalee",
      frequency: "Every 2nd and 4th Thursday",
      status: "active",
      startTime: "01:30 AM",
      endTime: "09:00 PM",
      driver: "Chaminda Rathnayake",
      vehicle: "Refrigerated Truck (EP-BC-7788)",
      contact: "+94 76 678 9012",
    },
    {
      id: 7,
      title: "Matara Local Distribution",
      description: "Distribution to Matara and surrounding areas",
      route: "Tangalle → Matara → Galle → Hikkaduwa",
      frequency: "Every Monday & Friday",
      status: "pending",
      startTime: "04:00 AM",
      endTime: "07:00 PM",
      driver: "Ajith Wickramasinghe",
      vehicle: "Refrigerated Van (SP-MT-5566)",
      contact: "+94 76 445 7788",
    },
    {
      id: 8,
      title: "Kurunegala Regional Route",
      description: "Distribution to Kurunegala and nearby towns",
      route: "Colombo → Negombo → Minuwangoda → Kurunegala → Kuliyapitiya",
      frequency: "Tuesday & Friday",
      status: "active",
      startTime: "03:30 AM",
      endTime: "06:00 PM",
      driver: "Saman Kumara",
      vehicle: "Refrigerated Van (NW-KU-1122)",
      contact: "+94 76 889 3344",
    },
    {
      id: 9,
      title: "Ratnapura Gem District Delivery",
      description: "Specialty seafood for hotels in gem mining areas",
      route: "Colombo → Avissawella → Ratnapura → Balangoda → Embilipitiya",
      frequency: "Thursday only",
      status: "pending",
      startTime: "02:00 AM",
      endTime: "05:30 PM",
      driver: "Priyantha Jayasuriya",
      vehicle: "Refrigerated Van (SP-RT-9900)",
      contact: "+94 76 997 5566",
    },
    {
      id: 10,
      title: "Friday Combined Delivery",
      description: "Friday deliveries for Matara and Kurunegala routes",
      route: "Multiple routes (Friday schedule)",
      frequency: "Every Friday",
      status: "active",
      startTime: "03:30 AM",
      endTime: "07:00 PM",
      driver: "Dual Team",
      vehicle: "Multiple Vehicles",
      contact: "+94 76 000 1111",
    },
    {
      id: 11,
      title: "Gem District Priority Delivery",
      description: "Enhanced Thursday seafood delivery",
      route: "Colombo → Ratnapura (Priority)",
      frequency: "Every Thursday",
      status: "pending",
      startTime: "01:30 AM",
      endTime: "04:30 PM",
      driver: "Priyantha Jayasuriya",
      vehicle: "Refrigerated Van (SP-RT-9900)",
      contact: "+94 76 997 5566",
    },
    {
      id: 12,
      title: "Monday Southern Route",
      description: "Exclusive Matara region delivery",
      route: "Extended Matara route",
      frequency: "Every Monday",
      status: "active",
      startTime: "03:00 AM",
      endTime: "06:30 PM",
      driver: "Ajith Wickramasinghe",
      vehicle: "Upgraded Refrigerated Van (SP-MT-5566X)",
      contact: "+94 76 445 7788",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = scheduleItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewItem = (itemId) => {
    const item = scheduleItems.find((i) => i.id === itemId);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8">
      {/* Main Content */}
      <div className="max-w-9xl mx-auto px-4 py-3">
        <div className="space-y-8 w-full">
          {/* Title and action buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight flex items-center">
                <Calendar className="mr-2 h-6 w-6" />
                Delivery Schedules
                <Badge className="ml-3">{filteredItems.length}</Badge>
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage your delivery and distribution schedules here
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search schedules..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Schedule cards grid - Adjusted card sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-shadow h-full flex flex-col border-2 border-blue-500"
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg line-clamp-1">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm h-[40px]">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Route:</span>
                      <Badge
                        variant="outline"
                        className="max-w-[120px] truncate text-xs"
                      >
                        {item.route}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Frequency:</span>
                      <span className="font-semibold text-xs">
                        {item.frequency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Timing:</span>
                      <span className="font-semibold text-xs">
                        {item.startTime} - {item.endTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge
                        className={
                          item.status === "active"
                            ? "bg-green-500 hover:bg-green-600 text-white text-xs"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => handleViewItem(item.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-8"
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      View Schedule
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">
                    {scheduleItems.length === 0
                      ? "Loading schedules..."
                      : "No matching schedules found"}
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Schedule Details Dialog */}
          <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-[625px] sm:max-h-[720px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedItem?.title} Details
                </DialogTitle>
              </DialogHeader>
              {selectedItem && (
                <Card className="border-2 border-blue-500 h-[428px] flex flex-col relative">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Description:</p>
                        <p>{selectedItem.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Route:</p>
                          <Badge variant="outline">{selectedItem.route}</Badge>
                        </div>
                        <div>
                          <p className="font-medium">Frequency:</p>
                          <p>{selectedItem.frequency}</p>
                        </div>
                        <div>
                          <p className="font-medium">Status:</p>
                          <Badge
                            className={
                              selectedItem.status === "active"
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                            }
                          >
                            {selectedItem.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">Timing:</p>
                          <p>
                            {selectedItem.startTime} to {selectedItem.endTime}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Driver:</p>
                          <p>{selectedItem.driver}</p>
                        </div>
                        <div>
                          <p className="font-medium">Vehicle:</p>
                          <p>{selectedItem.vehicle}</p>
                        </div>
                        <div>
                          <p className="font-medium">Contact:</p>
                          <p>{selectedItem.contact}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={handleCloseModal}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-500 h-8"
                    >
                      Close
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}