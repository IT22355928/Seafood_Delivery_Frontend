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
  Users,
  UserCircle,
  X,
  Building2
} from "lucide-react";
import { CompanyFormDialog } from "@/components/company-form-dialog";
import CompanyViewDialog from "../components/company-view-dialog";
import DeleteDialogBox from "../components/delete-dialog-box";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

export function Companies() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company =>
        company.c_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.c_regno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchTerm, companies]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/companies");
      setCompanies(response.data);
      setFilteredCompanies(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCompany = (companyId) => {
    const company = companies.find((c) => c._id === companyId);
    if (company) {
      setSelectedCompany(company);
    }
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = async () => {
    setExporting(true);
    const input = document.getElementById("companies-table");
    if (!input) {
      setExporting(false);
      return;
    }

    const actionColumns = input.querySelectorAll(".actions-column");
    const statusColumns = input.querySelectorAll("th:nth-child(7), td:nth-child(7)");
    
    actionColumns.forEach((column) => column.style.display = "none");
    statusColumns.forEach((column) => column.style.display = "none");

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

      // Add black border
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Add date and time
      const now = new Date();
      const dateTime = format(now, "MMMM dd, yyyy hh:mm a");
      pdf.setFontSize(10);
      pdf.text(`Generated: ${dateTime}`, 15, 20);

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
          pdf.addImage(logoImg, "JPEG", pageWidth - 35, 10, 25, 25);
        }
      } catch (logoError) {
        console.error("Error loading logo:", logoError);
      }

      pdf.setFontSize(16);
      pdf.text("Company Records", pageWidth / 2, 30, { align: "center" });

      // Add the table image
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

      pdf.save("company_records.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      actionColumns.forEach((column) => column.style.display = "");
      statusColumns.forEach((column) => column.style.display = "");
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
                <p className="text-gray-500 text-sm font-medium">Total Companies</p>
                <h3 className="text-3xl font-bold">{companies.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Companies</p>
                <h3 className="text-3xl font-bold text-green-600">
                  {companies.filter((c) => c.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Inactive Companies</p>
                <h3 className="text-3xl font-bold text-red-600">
                  {companies.filter((c) => c.status === "inactive").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Building2 className="mr-2 h-6 w-6" />
            Companies
            <Badge className="ml-3">{filteredCompanies.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">Manage your company records here</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleExport} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Exporting..." : "Export"}
          </Button>
          <CompanyFormDialog
            refresh={fetchData}
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Company
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
                placeholder="Search companies by name, registration number, email, or phone..."
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

      {/* Table */}
      <Card>
        <div className="rounded-md overflow-x-auto" id="companies-table">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Reg No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold">Owner</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right actions-column">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <TableRow key={company._id} className="hover:bg-gray-50">
                    <TableCell>{company.c_regno || "N/A"}</TableCell>
                    <TableCell>{company.c_name || "N/A"}</TableCell>
                    <TableCell>{company.address || "N/A"}</TableCell>
                    <TableCell>{company.o_name || "N/A"}</TableCell>
                    <TableCell>{company.email || "N/A"}</TableCell>
                    <TableCell>{company.phone || "N/A"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={company.status === "active" ? "default" : "destructive"}
                        className={
                          company.status === "active" 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }
                      >
                        {company.status || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right actions-column">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewCompany(company._id)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <CompanyFormDialog
                          refresh={fetchData}
                          company={company}
                          triggerButton={
                            <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />

                        <DeleteDialogBox
                          onDelete={async () => {
                            await axios.delete(`http://localhost:5000/api/companies/${company._id}`);
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
                    {companies.length === 0 ? "Loading companies..." : "No matching companies found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Company Details Modal */}
      <Dialog open={!!selectedCompany} onOpenChange={handleCloseModal}>
        <DialogContent className="w-[420px] sm:w-[600px]"> 
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogClose asChild>
            </DialogClose>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <Card>
                  <CardContent className="p-5 border-4 border-solid border-green-500">
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">RegNo:</span> {selectedCompany.c_regno || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Name:</span> {selectedCompany.c_name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Owner:</span> {selectedCompany.o_name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {selectedCompany.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {selectedCompany.phone || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {selectedCompany.address || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Description:</span> {selectedCompany.description || "N/A"}
                      </p>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <Badge 
                          variant={selectedCompany.status === "active" ? "default" : "destructive"}
                          className={
                            selectedCompany.status === "active" 
                              ? "bg-green-500 hover:bg-green-600 text-white" 
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }
                        >
                          {selectedCompany.status || "N/A"}
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