import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Box,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export function Warehouses() {
  const [warehouseItems] = useState([
    {
      id: 1,
      name: "Galle Warehouse",
      description: "Premium quality frozen seafood products",
      image: "https://thumbs.dreamstime.com/z/front-view-small-fish-market-building-big-sign-piece-ground-d-illustration-333862155.jpg?ct=jpeg",
      quantity: 15000,
      category: "Frozen",
      status: "active",
      location: "Galle",
      capacity: "500000 Kg",
      manager: "Nimal Wejesinghe",
      contact: "+94 76 123 4567"
    },
    {
      id: 2,
      name: "Kandy Warehouse",
      description: "Daily caught fresh fish varieties",
      image: "https://thumbs.dreamstime.com/b/front-view-small-fish-market-building-big-sign-piece-ground-d-illustration-vintage-village-seafood-333861311.jpg",
      quantity: 75000,
      category: "Fresh",
      status: "active",
      location: "Kandy",
      capacity: "700000 Kg",
      manager: "Sarath Munasinghe",
      contact: "+94 76 234 5678"
    },
    {
      id: 3,
      name: "Matara Warehouse",
      description: "High-protein canned tuna in various flavors",
      image: "https://thumbs.dreamstime.com/b/fish-shop-vector-kiosk-street-retro-shop-store-market-freshness-seafood-fridge-traditional-asian-meal-fish-shop-vector-111392823.jpg",
      quantity: 30000,
      category: "Canned",
      status: "active",
      location: "Matara",
      capacity: "900000 Kg",
      manager: "Supun Wickramasinghe",
      contact: "+94 76 345 6789"
    },
    {
      id: 4,
      name: "Jaffna Warehouse",
      description: "Various shrimp products and preparations",
      image: "https://img.freepik.com/premium-vector/stylish-fish-market-building-vector-icon-art_1080480-128949.jpg",
      quantity: 12000,
      category: "Frozen",
      status: "active",
      location: "Jaffna",
      capacity: "400000 Kg",
      manager: "Piumal Edirisinghe",
      contact: "+94 76 456 7890"
    },
    {
      id: 5,
      name: "Colombo Warehouse",
      description: "Healthy organic seaweed snacks",
      image: "https://c8.alamy.com/comp/2RY5NWE/seafood-market-stall-vector-illustration-with-fresh-fish-products-such-as-octopus-clams-shrimp-and-lobster-in-flat-cartoon-background-design-2RY5NWE.jpg",
      quantity: 20000,
      category: "Dried",
      status: "active",
      location: "Colombo",
      capacity: "1500000 Kg",
      manager: "Ajith Samarasooriya",
      contact: "+94 76 567 8901"
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = warehouseItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewItem = (itemId) => {
    const item = warehouseItems.find((i) => i.id === itemId);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8 w-full">
      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Box className="mr-2 h-6 w-6" />
            Warehouses
            <Badge className="ml-3">{filteredItems.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">Manage your seafood products warehouses</p>
        </div>
      </div>

      {/* Warehouse cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow h-full flex flex-col border-2 border-black">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=Warehouse+Image";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Location:</span>
                  <Badge variant="outline">{item.location}</Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">Capacity:</span>
                  <span className="font-semibold">{item.capacity}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge 
                    className={
                      item.status === "active" 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }
                  >
                    {item.status || "N/A"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button              
                  onClick={() => handleViewItem(item.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                {warehouseItems.length === 0 ? "Loading warehouses..." : "No matching warehouses found"}
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Warehouse Details Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[525px] sm:max-h-[720px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedItem?.name} Details
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <Card className="border-2 border-green-500 h-[628px] flex flex-col relative">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400?text=Warehouse+Image";
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Description:</p>
                    <p>{selectedItem.description}</p>
                  </div>
                  <div>
                    <p className="font-medium">Status:</p>
                    <Badge 
                      className={
                        selectedItem.status === "active" 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }
                    >
                      {selectedItem.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Capacity:</p>
                    <p>{selectedItem.capacity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Current Stock:</p>
                    <p>{selectedItem.quantity} Kg</p>
                  </div>
                  <div>
                    <p className="font-medium">Warehouse Manager:</p>
                    <p>{selectedItem.manager}</p>
                  </div>
                  <div>
                    <p className="font-medium">Location:</p>
                    <Badge variant="outline">{selectedItem.location}</Badge>
                  </div>         
                 
                  <div>
                    <p className="font-medium">Contact Number:</p>
                    <p>{selectedItem.contact}</p>
                  </div>
                  <div>
                    <p className="font-medium">Category:</p>
                    <Badge variant="outline">{selectedItem.category}</Badge>
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