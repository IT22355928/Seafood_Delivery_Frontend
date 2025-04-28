import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ClipboardList, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Initial order data
const initialOrderItems = [
  {
    id: 1,
    orderNumber: "ORD-2023-001",
    customer: "Kingsbury Hotel",
    items: "Tuna (10kg), Prawns (5kg), Crab (8kg)",
    orderDate: "2023-11-15",
    deliveryDate: "2023-11-20",
    status: "processing",
    totalAmount: "Rs 45,750",
    paymentMethod: "Bank Transfer",
    contact: "+94 76 123 4567",
  },
  {
    id: 2,
    orderNumber: "ORD-2023-002",
    customer: "Amariyo Colombo",
    items: "Salmon (15kg), Lobster (3kg), Squid (6kg)",
    orderDate: "2023-11-16",
    deliveryDate: "2023-11-21",
    status: "processing",
    totalAmount: "Rs 68,900",
    paymentMethod: "Credit Card",
    contact: "+94 76 234 5678",
  },
  {
    id: 3,
    orderNumber: "ORD-2023-003",
    customer: "Galle Face Hotel",
    items: "Red Snapper (20kg), Octopus (4kg), Mussels (10kg)",
    orderDate: "2023-11-17",
    deliveryDate: "2023-11-22",
    status: "processing",
    totalAmount: "Rs 52,300",
    paymentMethod: "Cash on Delivery",
    contact: "+94 76 345 6789",
  },
  {
    id: 4,
    orderNumber: "ORD-2023-004",
    customer: "Jetwing Beach",
    items: "Yellowfin Tuna (25kg), Shrimp (8kg), Crab (12kg)",
    orderDate: "2023-11-18",
    deliveryDate: "2023-11-23",
    status: "processing",
    totalAmount: "Rs 78,450",
    paymentMethod: "Bank Transfer",
    contact: "+94 76 456 7890",
  },
  {
    id: 5,
    orderNumber: "ORD-2023-005",
    customer: "Cinnamon Grand",
    items: "Swordfish (18kg), Prawns (10kg), Oysters (5 dozen)",
    orderDate: "2023-11-19",
    deliveryDate: "2023-11-24",
    status: "processing",
    totalAmount: "Rs 92,600",
    paymentMethod: "Credit Card",
    contact: "+94 76 567 8901",
  },
  {
    id: 6,
    orderNumber: "ORD-2023-006",
    customer: "Hilton Colombo",
    items: "Mahi Mahi (15kg), Lobster (5kg), Scallops (3kg)",
    orderDate: "2023-11-20",
    deliveryDate: "2023-11-25",
    status: "processing",
    totalAmount: "Rs 65,200",
    paymentMethod: "Credit Card",
    contact: "+94 76 678 9012",
  },
  {
    id: 7,
    orderNumber: "ORD-2023-007",
    customer: "Taj Samudra",
    items: "Barramundi (12kg), Crab (10kg), Squid (8kg)",
    orderDate: "2023-11-21",
    deliveryDate: "2023-11-26",
    status: "processing",
    totalAmount: "Rs 58,750",
    paymentMethod: "Bank Transfer",
    contact: "+94 76 789 0123",
  },
  {
    id: 8,
    orderNumber: "ORD-2023-008",
    customer: "Mount Lavinia Hotel",
    items: "Sea Bass (20kg), Prawns (12kg), Mussels (8kg)",
    orderDate: "2023-11-22",
    deliveryDate: "2023-11-27",
    status: "processing",
    totalAmount: "Rs 71,300",
    paymentMethod: "Cash on Delivery",
    contact: "+94 76 890 1234",
  },
  {
    id: 9,
    orderNumber: "ORD-2023-009",
    customer: "Heritance Ahungalla",
    items: "Tuna (25kg), Lobster (6kg), Oysters (8 dozen)",
    orderDate: "2023-11-23",
    deliveryDate: "2023-11-28",
    status: "processing",
    totalAmount: "Rs 105,400",
    paymentMethod: "Credit Card",
    contact: "+94 76 901 2345",
  },
  {
    id: 10,
    orderNumber: "ORD-2023-010",
    customer: "Cinnamon Grand Colombo",
    items: "Salmon (30kg), Prawns (15kg), Squid (10kg)",
    orderDate: "2023-11-24",
    deliveryDate: "2023-11-29",
    status: "processing",
    totalAmount: "Rs 87,650",
    paymentMethod: "Bank Transfer",
    contact: "+94 76 812 3456"
  },
  {
    id: 11,
    orderNumber: "ORD-2023-011",
    customer: "Jetwing Lighthouse Galle",
    items: "Crab (8kg), Sea Bass (20kg), Mussels (5 dozen)",
    orderDate: "2023-11-25",
    deliveryDate: "2023-11-30",
    status: "processing",
    totalAmount: "Rs 68,900",
    paymentMethod: "Cash on Delivery",
    contact: "+94 76 723 4567"
  },
  {
    id: 12,
    orderNumber: "ORD-2023-012",
    customer: "Anantara Kalutara",
    items: "Yellowfin Tuna (40kg), Scallops (3 dozen), Octopus (12kg)",
    orderDate: "2023-11-26",
    deliveryDate: "2023-12-01",
    status: "processing",
    totalAmount: "Rs 124,750",
    paymentMethod: "Credit Card",
    contact: "+94 76 634 5678"
  }
];

export function Orders() {
  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Load saved orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrderItems(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orderItems));
  }, [orderItems]);

  const filteredItems = orderItems.filter(
    (item) =>
      item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewItem = (itemId) => {
    const item = orderItems.find((i) => i.id === itemId);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleAcceptOrder = (orderId) => {
    const updatedItems = orderItems.map(item =>
      item.id === orderId ? { ...item, status: "accepted" } : item
    );
    setOrderItems(updatedItems);
  };

  const handleRejectOrder = (orderId) => {
    const updatedItems = orderItems.map(item =>
      item.id === orderId ? { ...item, status: "rejected" } : item
    );
    setOrderItems(updatedItems);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "accepted":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "rejected":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <ClipboardList className="mr-2 h-6 w-6" />
            Customer Orders
            <Badge className="ml-3">{filteredItems.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Order cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-shadow h-full flex flex-col border-2 border-blue-500"
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-1">
                  {item.orderNumber}
                </CardTitle>
                <CardDescription className="line-clamp-1 text-sm">
                  {item.customer}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Order Date:</span>
                  <span className="text-xs">{item.orderDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Delivery Date:</span>
                  <span className="text-xs">{item.deliveryDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Items:</span>
                  <span className="text-xs line-clamp-1 max-w-[120px]">
                    {item.items}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="font-semibold text-xs">
                    {item.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className={`text-xs ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  onClick={() => handleAcceptOrder(item.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm h-8"
                  disabled={item.status !== "processing"}
                >
                  <Check className="mr-1 h-3 w-3" />
                  Accept
                </Button>
                <Button
                  onClick={() => handleRejectOrder(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm h-8"
                  disabled={item.status !== "processing"}
                >
                  <X className="mr-1 h-3 w-3" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleViewItem(item.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm h-8"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                {orderItems.length === 0
                  ? "Loading orders..."
                  : "No matching orders found"}
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[625px] sm:max-h-[720px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Order Details: {selectedItem?.orderNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <Card className="border-2 border-blue-500 h-[428px] flex flex-col relative">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Customer:</p>
                    <p>{selectedItem.customer}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Order Date:</p>
                      <p>{selectedItem.orderDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Delivery Date:</p>
                      <p>{selectedItem.deliveryDate}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <Badge className={getStatusBadge(selectedItem.status)}>
                        {selectedItem.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">Payment Method:</p>
                      <p>{selectedItem.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Amount:</p>
                      <p className="font-bold">{selectedItem.totalAmount}</p>
                    </div>
                    <div>
                      <p className="font-medium">Contact:</p>
                      <p>{selectedItem.contact}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Order Items:</p>
                    <div className="bg-gray-100 p-3 rounded-md mt-2">
                      {selectedItem.items}
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
  );
}