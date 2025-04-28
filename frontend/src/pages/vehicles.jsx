import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash,
  Eye,
  Download,
  Truck,
  X
} from "lucide-react";
import { VehicleFormDialog } from "@/components/vehicle-form-dialog";
import DeleteDialogBox from "../components/delete-dialog-box";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format, parseISO } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

export function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(vehicle =>
        vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.v_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.v_model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.fuel_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
  }, [searchTerm, vehicles]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/vehicles");
      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }
      const data = await response.json();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewVehicle = (vehicleId) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = async () => {
    setExporting(true);
    const input = document.getElementById("vehicles-table");
    if (!input) {
      setExporting(false);
      return;
    }

    const actionColumns = input.querySelectorAll(".actions-column");
    const statusColumns = input.querySelectorAll("th:nth-child(8), td:nth-child(8)");
    const imageColumns = input.querySelectorAll("th:nth-child(9), td:nth-child(9)");
    
    actionColumns.forEach((column) => column.style.display = "none");
    statusColumns.forEach((column) => column.style.display = "none");
    imageColumns.forEach((column) => column.style.display = "none");

    try {
      const canvas = await html2canvas(input, { 
        scale: 2,
        logging: true,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const offsetX = (pageWidth - imgWidth) / 2;
      const offsetY = 40;

      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      const now = new Date();
      const dateTime = format(now, "MMMM dd, yyyy hh:mm a");
      pdf.setFontSize(10);
      pdf.text(`Generated: ${dateTime}`, 15, 20);

      try {
        const logoImg = new Image();
        logoImg.src = "/seafood.jpg";
        logoImg.crossOrigin = "Anonymous";
        
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
        });

        if (logoImg.complete && logoImg.naturalHeight !== 0) {
          pdf.addImage(logoImg, "JPEG", pageWidth - 35, 10, 25, 25);
        }
      } catch (logoError) {
        console.error("Error loading logo:", logoError);
      }

      pdf.setFontSize(16);
      pdf.text("Vehicle Records", pageWidth / 2, 30, { align: "center" });

      pdf.addImage(imgData, "PNG", offsetX, offsetY, imgWidth, imgHeight);

      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      pdf.save("vehicle_records.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      actionColumns.forEach((column) => column.style.display = "");
      statusColumns.forEach((column) => column.style.display = "");
      imageColumns.forEach((column) => column.style.display = "");
      setExporting(false);
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Vehicles</p>
                <h3 className="text-3xl font-bold">{vehicles.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Vehicles</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {vehicles.filter((v) => v.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive Vehicles</p>
                <h3 className="text-3xl font-bold text-red-600">
                  {vehicles.filter((v) => v.status === "inactive").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Truck className="mr-2 h-6 w-6" />
            Delivery Vehicles
            <Badge className="ml-3">{filteredVehicles.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">Manage your vehicle records here</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleExport} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Exporting..." : "Export"}
          </Button>
          <VehicleFormDialog
            refresh={fetchData}
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            }
          />
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search vehicles by license plate, type, model, or fuel type..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table with 2px black border */}
      <Card>
        <div className="rounded-md overflow-x-auto" id="vehicles-table">
          <Table>
            <TableHeader className="bg-gray-50 ">
              <TableRow>
                <TableHead className="font-semibold">License Plate</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Model</TableHead>
                <TableHead className="font-semibold">Year</TableHead>
                <TableHead className="font-semibold">Refrigeration</TableHead>
                <TableHead className="font-semibold">Fuel Type</TableHead>
                <TableHead className="font-semibold">Max Load</TableHead>           
                <TableHead className="font-semibold">Delivery Area</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-center actions-column">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle._id} className="hover:bg-gray-50">
                    <TableCell>{vehicle.licensePlate || "N/A"}</TableCell>
                    <TableCell>{vehicle.v_type || "N/A"}</TableCell>
                    <TableCell>{vehicle.v_model || "N/A"}</TableCell>
                    <TableCell>{vehicle.year || "N/A"}</TableCell>
                    <TableCell>{vehicle.refrigeration_type || "None"}</TableCell>
                    <TableCell>{vehicle.fuel_type || "N/A"}</TableCell>
                    <TableCell>{vehicle.max_load || "N/A"} Kg</TableCell>
                    <TableCell>{vehicle.delivery_area || "N/A"}</TableCell>             
                    <TableCell>
                      <Badge 
                        className={
                          vehicle.status === "active" 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {vehicle.status || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right actions-column">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewVehicle(vehicle._id)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <VehicleFormDialog
                          refresh={fetchData}
                          vehicle={vehicle}
                          triggerButton={
                            <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />

                        <DeleteDialogBox
                          onDelete={async () => {
                            await axios.delete(`http://localhost:5000/api/vehicles/${vehicle._id}`);
                            fetchData();
                          }}
                          triggerButton={
                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                              <Trash className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    {vehicles.length === 0 ? "Loading vehicles..." : "No matching vehicles found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Vehicle Details Modal */}
      <Dialog open={!!selectedVehicle} onOpenChange={handleCloseModal}>
        <DialogContent className="w-[420px] sm:w-[600px]"> 
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
            <DialogClose asChild>
            </DialogClose>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <Card className="h-85">
                  <CardContent className="p-5 border-4 border-solid border-green-500">
                    <img src="seafood2.jpg" className="w-150 h-40 ml-16"/>
                    <div className="space-y-2.5 mt-5">
                      <p>
                        <span className="font-medium">License Plate:</span> {selectedVehicle.licensePlate || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Vehicle Type:</span> {selectedVehicle.v_type || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Vehicle Model:</span> {selectedVehicle.v_model || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Manufacture Year:</span> {selectedVehicle.year || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Refrigeration Type:</span> {selectedVehicle.refrigeration_type || "None"}
                      </p>
                      <p>
                        <span className="font-medium">Fuel Type:</span> {selectedVehicle.fuel_type || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Max Load:</span> {selectedVehicle.max_load || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Last Maintenance:</span> {formatDate(selectedVehicle.last_maintenance)}
                      </p>
                      <p>
                        <span className="font-medium">Food Certificate Number:</span> {selectedVehicle.certification_no || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Food Certificate Expiry Date:</span> {formatDate(selectedVehicle.certification_expire_date)}
                      </p>
                      <p>
                        <span className="font-medium">Delivery Area:</span> {selectedVehicle.delivery_area || "N/A"}
                      </p>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <Badge 
                          className={
                            selectedVehicle.status === "active" 
                              ? "bg-green-500 hover:bg-green-600 text-white" 
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }
                        >
                          {selectedVehicle.status || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>           
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}