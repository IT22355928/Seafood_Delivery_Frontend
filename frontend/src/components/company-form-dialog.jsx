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
import { Plus, Pencil, Building, MapPin, User, Mail, Phone, FileText } from "lucide-react";

export function CompanyFormDialog({ company = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    c_regno: "",
    c_name: "",
    address: "",
    o_name: "",
    email: "",
    phone: "",
    description: "",
    status: "active",
  });

  const isEditMode = !!company;

  useEffect(() => {
    if (company) {
      setFormData({
        c_regno: company.c_regno || "",
        c_name: company.c_name || "",
        address: company.address || "",
        o_name: company.o_name || "",
        email: company.email || "",
        phone: company.phone || "",
        description: company.description || "",
        status: company.status || "active",
      });
    }
  }, [company]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const validateRegistrationNumber = (regno) => {
    const re = /^R\d{4}$/;
    return re.test(regno);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.c_regno.trim()) {
      alert("Company registration number is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateRegistrationNumber(formData.c_regno)) {
      alert("Registration number must start with 'R' followed by exactly 4 digits (e.g., R1234)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.c_name.trim()) {
      alert("Company name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.address.trim()) {
      alert("Address is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address (e.g., example@domain.com)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.phone.trim()) {
      alert("Phone number is required");
      setIsSubmitting(false);
      return;
    }
    if (!validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      setIsSubmitting(false);
      return;
    }

    const companyData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, '')
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/companies/${company._id}`,
          companyData,
          config
        );
        alert("Company updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/companies",
          companyData,
          config
        );
        alert("Company created successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving company:", error);
      let errorMessage = "An error occurred while saving the company.";
      
      if (error.response) {
        if (error.response.data?.errors) {
          errorMessage = Object.values(error.response.data.errors)
            .map(err => err.message || err)
            .join('\n');
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = "Request setup error. Please try again.";
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (isEditMode && company) {
      setFormData({
        c_regno: company.c_regno || "",
        c_name: company.c_name || "",
        address: company.address || "",
        o_name: company.o_name || "",
        email: company.email || "",
        phone: company.phone || "",
        description: company.description || "",
        status: company.status || "active",
      });
    } else {
      setFormData({
        c_regno: "",
        c_name: "",
        address: "",
        o_name: "",
        email: "",
        phone: "",
        description: "",
        status: "active",
      });
    }
    setError(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        {triggerButton || (
          <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200">
            {isEditMode ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isEditMode ? "Edit Company" : "Add Company"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-4 border-blue-500 h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header without border */}
          <DialogHeader className="pb-4 bg-white ">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Company" : "Add New Company"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the company details below."
                : "Enter the company details below to create a new company record."}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-5 px-2">
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="c_regno" className="text-sm font-medium text-gray-700 mb-1 block">
                      Registration Number *
                    </Label>
                    <Input
                      id="c_regno"
                      name="c_regno"
                      value={formData.c_regno}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter registration number (e.g., R1234)"
                      required
                      pattern="R\d{4}"
                      title="Registration number must start with 'R' followed by 4 digits (e.g., R1234)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must start with 'R' followed by 4 digits (e.g., R1234)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="c_name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Company Name *
                    </Label>
                    <Input
                      id="c_name"
                      name="c_name"
                      value={formData.c_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter address"
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="o_name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Owner Name *
                    </Label>
                    <Input
                      id="o_name"
                      name="o_name"
                      value={formData.o_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter owner name"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="company@example.com"
                      required
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      title="Please enter a valid email address (e.g., example@domain.com)"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter phone number"
                      required
                      minLength="10"
                      maxLength="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be 10 digits</p>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1 block">
                      Description *
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
              </Card>

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

          {/* Footer without border */}
          <DialogFooter className="pt-4 bg-white">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditMode ? "Update Company" : "Add Company"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}