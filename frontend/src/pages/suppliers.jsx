import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  SlidersHorizontal,
  UserCircle,
  Building2,
  ChevronDown,
  Users,
  Download,
  Pencil,
  Trash,
  Eye,
  X
} from "lucide-react";
import { SupplierFormDialog } from "@/components/supplier-form-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import DeleteDialogBox from "../components/delete-dialog-box";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.s_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.s_regno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewSupplier = (supplierId) => {
    const supplier = suppliers.find((sup) => sup._id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const handleCloseModal = () => {
    setSelectedSupplier(null);
  };

  const handleExport = async () => {
    const input = document.getElementById("suppliers-table");
    if (!input) return;
  
    // Hide columns we don't want in the PDF
    const actionColumns = input.querySelectorAll(".actions-column");
    const statusColumns = input.querySelectorAll("th:nth-child(7), td:nth-child(7)");
    const profileColumns = input.querySelectorAll("th:nth-child(6), td:nth-child(6)");
    
    actionColumns.forEach((column) => column.style.display = "none");
    statusColumns.forEach((column) => column.style.display = "none");
    profileColumns.forEach((column) => column.style.display = "none");
  
    try {
      // First capture the table
      const canvas = await html2canvas(input, { 
        scale: 2,
        logging: true,
        useCORS: true
      });
  
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const offsetX = (pageWidth - imgWidth) / 2;
      const offsetY = 40; // Increased from 30 to 40 for more top margin
  
      // Add black border
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
      // Add date and time
      const now = new Date();
      const dateTime = format(now, "MMMM dd, yyyy hh:mm a");
      pdf.setFontSize(10);
      pdf.text(`Generated: ${dateTime}`, 15, 20); // Changed from 15 to 20 for more top margin
  
      // Add logo
      try {
        const logoImg = new Image();
        logoImg.src = "/seafood.jpg";
        logoImg.crossOrigin = "Anonymous";
        
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
        });
  
        if (logoImg.complete && logoImg.naturalHeight !== 0) {
          pdf.addImage(logoImg, "JPEG", pageWidth - 35, 10, 25, 25); // Changed from 10 to 15 for more top margin
        }
      } catch (logoError) {
        console.error("Error loading logo:", logoError);
      }
  
      pdf.setFontSize(16);
      pdf.text("Supplier Records", pageWidth / 2, 30, { align: "center" }); // Changed from 20 to 25 for more top margin
  
      // Add the table image with increased top margin
      pdf.addImage(imgData, "PNG", offsetX, offsetY, imgWidth, imgHeight);
  
      // Add page number
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
  
      pdf.save("suppliers.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore hidden columns
      actionColumns.forEach((column) => column.style.display = "");
      statusColumns.forEach((column) => column.style.display = "");
      profileColumns.forEach((column) => column.style.display = "");
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
                <p className="text-gray-500 text-sm font-medium">Total Suppliers</p>
                <h3 className="text-3xl font-bold">{suppliers.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Suppliers</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {suppliers.filter((sup) => sup.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive Suppliers</p>
                <h3 className="text-3xl font-bold text-red-600">
                  {suppliers.filter((sup) => sup.status === "inactive").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Suppliers
            <Badge className="ml-3">{filteredSuppliers.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">Manage your company's supplier directory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <SupplierFormDialog
            refresh={fetchData}
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
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
                placeholder="Search suppliers by name, registration number, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4 text-gray-500" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <div className="rounded-md overflow-x-auto" id="suppliers-table">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Reg No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Profile</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right actions-column">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier._id} className="hover:bg-gray-50">
                    <TableCell>{supplier.s_regno}</TableCell>
                    <TableCell>{supplier.s_name}</TableCell>
                    <TableCell>{supplier.address}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>
                      {supplier.profile ? (
                        <img 
                          src={supplier.profile} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                            e.target.onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          supplier.status === "active" 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {supplier.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right actions-column">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewSupplier(supplier._id)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <SupplierFormDialog
                          refresh={fetchData}
                          supplier={supplier}
                          triggerButton={
                            <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />

                        <DeleteDialogBox
                          onDelete={async () => {
                            await axios.delete(`http://localhost:5000/api/suppliers/${supplier._id}`);
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
                  <TableCell colSpan={8} className="text-center py-8">
                    No suppliers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Supplier Details Modal */}
      <Dialog open={!!selectedSupplier} onOpenChange={handleCloseModal}>
        <DialogContent className="w-[420px]"> 
          <DialogHeader>
            <DialogTitle>Supplier Details</DialogTitle>
            <DialogClose asChild>
            </DialogClose>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-5 border-4 border-solid border-green-500">
                    <div className="flex items-center gap-4 mb-4">
                      {selectedSupplier.profile ? (
                        <img 
                          src={selectedSupplier.profile} 
                          alt="Profile" 
                          className="w-20 h-20 rounded-full object-cover ml-10"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                            e.target.onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-10 w-10 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">RegNo:</span> {selectedSupplier.s_regno}
                      </p>
                      <p>
                        <span className="font-medium">Name:</span> {selectedSupplier.s_name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {selectedSupplier.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {selectedSupplier.phone}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {selectedSupplier.address || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Marital Status:</span>{" "}
                        {selectedSupplier.maritalstatus || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Gender:</span>{" "}
                        {selectedSupplier.gender || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Birthday:</span>{" "}
                        {selectedSupplier.birthday ? format(new Date(selectedSupplier.birthday), "MMMM dd, yyyy") : "N/A"}
                      </p>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <Badge 
                          className={
                            selectedSupplier.status === "active" 
                              ? "bg-green-500 hover:bg-green-600 text-white" 
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }
                        >
                          {selectedSupplier.status}
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