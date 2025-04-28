import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Truck, 
  Calendar, 
  MapPin,
  User,
  Phone,
  ClipboardList,
  Plus
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DeliveryFormDialog({ delivery = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    o_no: "",
    c_code: "",
    c_name: "",
    d_code: "",
    d_name: "",
    d_contactno: "",
    v_no: "",
    d_date: "",
    d_location: "",
    status: "active",
  });

  const deliveryLocations = [
    "Matara", "Galle", "Anuradhapura", "Kandy", 
    "Jaffna", "Colombo", "Hambantota", "Monaragala",
    "Trincomalee", "Polonnaruwa", "Moratuwa", "Ratnapura"
  ];

  const deliveryVehicles = [
    "ABD-7789", "GFH-7865", "HHK-6743", "AAH-6642", 
    "SSL-5543", "DDT-6754", "JLY-8890", "KKR-6687",
    "SSE-6674", "AAB-5544", "CAD-2345", "CAP-6941"
  ];

  const isEditMode = !!delivery;

  useEffect(() => {
    if (delivery) {
      setFormData({
        o_no: delivery.o_no || "",
        c_code: delivery.c_code || "",
        c_name: delivery.c_name || "",
        d_code: delivery.d_code || "",
        d_name: delivery.d_name || "",
        d_contactno: delivery.d_contactno || "",
        v_no: delivery.v_no || "",
        d_date: formatDateForInput(delivery.d_date),
        d_location: delivery.d_location || "",
        status: delivery.status || "active",
      });
    }
  }, [delivery]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const validateCustomerCode = (code) => /^C\d{3}$/.test(code);
  const validateDriverCode = (code) => /^D\d{3}$/.test(code);
  const validateOrderNumber = (number) => /^O\d{3}$/.test(number);
  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateVehicleNumber = (number) => /^[A-Z]{3}-\d{4}$/.test(number);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation checks
    if (!formData.o_no.trim()) {
      alert("Order number is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateOrderNumber(formData.o_no)) {
      alert("Order number must be in format O123 (O followed by 3 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.c_code.trim()) {
      alert("Customer code is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateCustomerCode(formData.c_code)) {
      alert("Customer code must be in format C123 (C followed by 3 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.c_name.trim()) {
      alert("Customer name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.d_code.trim()) {
      alert("Driver code is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateDriverCode(formData.d_code)) {
      alert("Driver code must be in format D123 (D followed by 3 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.d_name.trim()) {
      alert("Driver name is required");
      setIsSubmitting(false);
      return;
    }
    if (!validatePhoneNumber(formData.d_contactno)) {
      alert("Driver contact must be a 10-digit number");
      setIsSubmitting(false);
      return;
    }
    if (!formData.v_no.trim()) {
      alert("Vehicle number is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateVehicleNumber(formData.v_no)) {
      alert("Vehicle number must be in format ABC-1234 (3 letters, hyphen, 4 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.d_date) {
      alert("Delivery date is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.d_location) {
      alert("Delivery location is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const deliveryData = {
        ...formData,
        d_date: formData.d_date || null
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/deliveries/${delivery._id}`,
          deliveryData,
          config
        );
        alert("Delivery updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/deliveries",
          deliveryData,
          config
        );
        alert("Delivery created successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving delivery:", error);
      let errorMessage = "An error occurred while saving the delivery.";
      
      if (error.response) {
        if (error.response.data?.errors) {
          errorMessage = Object.values(error.response.data.errors)
            .map(err => err.message || err)
            .join('\n');
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (isEditMode && delivery) {
      setFormData({
        o_no: delivery.o_no || "",
        c_code: delivery.c_code || "",
        c_name: delivery.c_name || "",
        d_code: delivery.d_code || "",
        d_name: delivery.d_name || "",
        d_contactno: delivery.d_contactno || "",
        v_no: delivery.v_no || "",
        d_date: formatDateForInput(delivery.d_date),
        d_location: delivery.d_location || "",
        status: delivery.status || "active",
      });
    } else {
      setFormData({
        o_no: "",
        c_code: "",
        c_name: "",
        d_code: "",
        d_name: "",
        d_contactno: "",
        v_no: "",
        d_date: "",
        d_location: "",
        status: "active",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200">
            {isEditMode ? <ClipboardList className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isEditMode ? "Edit Delivery" : "Add Delivery"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-4 border-blue-500 h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="pb-4 bg-white">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Delivery" : "Add New Delivery"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the delivery details below."
                : "Enter the delivery details below to create a new delivery record."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-5 px-2">
              {/* Order Number */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ClipboardList className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="o_no" className="text-sm font-medium text-gray-700 mb-1 block">
                      Order Number *
                    </Label>
                    <Input
                      id="o_no"
                      name="o_no"
                      value={formData.o_no}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter order number (O123)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: O followed by 3 digits (O123)</p>
                  </div>
                </div>
              </Card>

              {/* Customer Code */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="c_code" className="text-sm font-medium text-gray-700 mb-1 block">
                      Customer Code *
                    </Label>
                    <Input
                      id="c_code"
                      name="c_code"
                      value={formData.c_code}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter customer code (C123)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: C followed by 3 digits (C123)</p>
                  </div>
                </div>
              </Card>

              {/* Customer Name */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="c_name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Customer Name *
                    </Label>
                    <Input
                      id="c_name"
                      name="c_name"
                      value={formData.c_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Driver Code */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="d_code" className="text-sm font-medium text-gray-700 mb-1 block">
                      Driver Code *
                    </Label>
                    <Input
                      id="d_code"
                      name="d_code"
                      value={formData.d_code}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter driver code (D123)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: D followed by 3 digits (D123)</p>
                  </div>
                </div>
              </Card>

              {/* Driver Name */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="d_name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Driver Name *
                    </Label>
                    <Input
                      id="d_name"
                      name="d_name"
                      value={formData.d_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter driver name"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Driver Contact */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="d_contactno" className="text-sm font-medium text-gray-700 mb-1 block">
                      Driver Contact Number *
                    </Label>
                    <Input
                      id="d_contactno"
                      name="d_contactno"
                      value={formData.d_contactno}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter 10-digit contact number"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be 10 digits (no spaces or dashes)</p>
                  </div>
                </div>
              </Card>

              {/* Vehicle Number */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="v_no" className="text-sm font-medium text-gray-700 mb-1 block">
                      Vehicle Number *
                    </Label>
                    <Select
                      value={formData.v_no}
                      onValueChange={(value) => handleSelectChange("v_no", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vehicle number" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryVehicles.map((vehicle) => (
                          <SelectItem key={vehicle} value={vehicle}
                             className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >
                            {vehicle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1"></p>
                  </div>
                </div>
              </Card>

              {/* Delivery Date */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="d_date" className="text-sm font-medium text-gray-700 mb-1 block">
                      Delivery Date *
                    </Label>
                    <Input
                      id="d_date"
                      name="d_date"
                      type="date"
                      value={formData.d_date}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Delivery Location */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="d_location" className="text-sm font-medium text-gray-700 mb-1 block">
                      Delivery Location *
                    </Label>
                    <Select 
                      value={formData.d_location} 
                      onValueChange={(value) => handleSelectChange("d_location", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select delivery location" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryLocations.map((location) => (
                          <SelectItem key={location} value={location}
                             className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Status */}
              <Card className="p-1 border-none shadow-none">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1 block">
                  Status
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      formData.status === "active"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData({...formData, status: "active"})}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${
                        formData.status === "active" ? "bg-green-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      formData.status === "inactive"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setFormData({...formData, status: "inactive"})}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${
                        formData.status === "inactive" ? "bg-red-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <DialogFooter className="pt-4 bg-white">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditMode ? "Update Delivery" : "Add Delivery"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}