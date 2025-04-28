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
  Box,
  ChevronDown,
  Download,
  Pencil,
  Trash,
  Eye,
  X,
  Tag,
  MapPin,
  Hash,
  DollarSign
} from "lucide-react";
import { StockFormDialog } from "@/components/stock-form-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import DeleteDialogBox from "../components/delete-dialog-box";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/stocks");
      if (!response.ok) {
        throw new Error("Failed to fetch stocks");
      }
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredStocks = stocks.filter((stock) => {
    return (
      stock.i_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.i_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.i_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.s_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewItem = (stockId) => {
    const stock = stocks.find((i) => i._id === stockId);
    if (stock) {
      setSelectedStock(stock);
    }
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
  };

  const handleExport = async () => {
    const input = document.getElementById("stocks-table");
    if (!input) return;
  
    const actionColumns = input.querySelectorAll(".actions-column");
    const statusColumns = input.querySelectorAll("th:nth-child(9), td:nth-child(9)");
    
    actionColumns.forEach((column) => column.style.display = "none");
    statusColumns.forEach((column) => column.style.display = "none");
  
    try {
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
      pdf.text("Stock Records", pageWidth / 2, 30, { align: "center" });
  
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
  
      pdf.save("stocks.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      actionColumns.forEach((column) => column.style.display = "");
      statusColumns.forEach((column) => column.style.display = "");
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
                <p className="text-gray-500 text-sm font-medium">Total Items</p>
                <h3 className="text-3xl font-bold">{stocks.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Box className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avaliable Stock Items</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {stocks.filter((stock) => stock.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Box className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Out Of Stock Items</p>
                <h3 className="text-3xl font-bold text-red-600">
                  {stocks.filter((stock) => stock.status === "inactive").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Box className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Box className="mr-2 h-6 w-6" />
            Inventory
            <Badge className="ml-3">{filteredStocks.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">Manage your company's stock items</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <StockFormDialog
            refresh={fetchData}
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
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
                placeholder="Search items by name, code, category, or supplier..."
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
        <div className="rounded-md overflow-x-auto" id="stocks-table">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Item Code</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Unit Price</TableHead>
                <TableHead className="font-semibold">Total Value</TableHead>
                <TableHead className="font-semibold">Supplier</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right actions-column">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <TableRow key={stock._id} className="hover:bg-gray-50">
                    <TableCell>{stock.i_code}</TableCell>
                    <TableCell>{stock.i_name}</TableCell>
                    <TableCell>{stock.i_category}</TableCell>
                    <TableCell>{stock.qty}</TableCell>
                    <TableCell>Rs {parseFloat(stock.u_price).toFixed(2)}</TableCell>
                    <TableCell>Rs {parseFloat(stock.t_value).toFixed(2)}</TableCell>
                    <TableCell>{stock.s_name || "N/A"}</TableCell>
                    <TableCell>{stock.location || "N/A"}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          stock.status === "active" 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {stock.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right actions-column">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewItem(stock._id)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <StockFormDialog
                          refresh={fetchData}
                          stock={stock}
                          triggerButton={
                            <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />

                        <DeleteDialogBox
                          onDelete={async () => {
                            await axios.delete(`http://localhost:5000/api/stocks/${stock._id}`);
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
                    No stock items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Stock Item Details Modal */}
      <Dialog open={!!selectedStock} onOpenChange={handleCloseModal}>
        <DialogContent className="w-[420px]"> 
          <DialogHeader>
            <DialogTitle>Stock Item Details</DialogTitle>
            <DialogClose asChild>
            </DialogClose>
          </DialogHeader>
          {selectedStock && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-5 border-4 border-solid border-green-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center ml-10">
                        <img src="seafood.jpg"/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Item Code:</span> {selectedStock.i_code}
                      </p>
                      <p>
                        <span className="font-medium">Name:</span> {selectedStock.i_name}
                      </p>
                      <p>
                        <span className="font-medium">Category:</span> {selectedStock.i_category || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span> {selectedStock.qty} Kg
                      </p>
                      <p>
                        <span className="font-medium">Unit Price:</span> Rs {parseFloat(selectedStock.u_price).toFixed(2)}
                      </p>
                      <p>
                        <span className="font-medium">Total Value:</span> Rs {parseFloat(selectedStock.t_value).toFixed(2)}
                      </p>
                      <p>
                        <span className="font-medium">Supplier:</span> {selectedStock.s_name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Purchase Date:</span>{" "}
                        {selectedStock.d_purchase ? format(new Date(selectedStock.d_purchase), "MMMM dd, yyyy") : "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Supplier Contact:</span> {selectedStock.s_contact || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span> {selectedStock.location || "N/A"}
                      </p>
                      <p className="pt-2">
                        <span className="font-medium">Description:</span>{" "}
                        <div className="mt-1 p-2 bg-gray-50 rounded">
                          {selectedStock.i_description || "No description available"}
                        </div>
                      </p>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <Badge 
                          className={
                            selectedStock.status === "active" 
                              ? "bg-green-500 hover:bg-green-600 text-white" 
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }
                        >
                          {selectedStock.status}
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