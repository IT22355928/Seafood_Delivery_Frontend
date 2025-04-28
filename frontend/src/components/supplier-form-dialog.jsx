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
import { Plus, Pencil, User, MapPin, Mail, Phone, FileText } from "lucide-react";

export function SupplierFormDialog({ supplier = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    s_regno: "",
    s_name: "",
    address: "",
    maritalstatus: "",
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    profile: "",
    status: "active",
  });

  const isEditMode = !!supplier;

  useEffect(() => {
    if (supplier) {
      setFormData({
        s_regno: supplier.s_regno || "",
        s_name: supplier.s_name || "",
        address: supplier.address || "",
        maritalstatus: supplier.maritalstatus || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        gender: supplier.gender || "",
        birthday: formatDateForInput(supplier.birthday),
        profile: supplier.profile || "",
        status: supplier.status || "active",
      });
    }
  }, [supplier]);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  };

  const validateRegistrationNumber = (regno) => {
    const re = /^S\d{4}$/;
    return re.test(regno);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profile: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.s_regno.trim()) {
      alert("Supplier registration number is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateRegistrationNumber(formData.s_regno)) {
      alert("Registration number must start with 'S' followed by exactly 4 digits (e.g., S1234)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.s_name.trim()) {
      alert("Supplier name is required");
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

    const supplierData = {
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
          `http://localhost:5000/api/suppliers/${supplier._id}`,
          supplierData,
          config
        );
        alert("Supplier updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/suppliers",
          supplierData,
          config
        );
        alert("Supplier created successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving supplier:", error);
      let errorMessage = "An error occurred while saving the supplier.";
      
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
    if (isEditMode && supplier) {
      setFormData({
        s_regno: supplier.s_regno || "",
        s_name: supplier.s_name || "",
        address: supplier.address || "",
        maritalstatus: supplier.maritalstatus || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        gender: supplier.gender || "",
        birthday: formatDateForInput(supplier.birthday),
        profile: supplier.profile || "",
        status: supplier.status || "active",
      });
    } else {
      setFormData({
        s_regno: "",
        s_name: "",
        address: "",
        maritalstatus: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        profile: "",
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
            {isEditMode ? "Edit Supplier" : "Add Supplier"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-4 border-blue-500 h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="pb-4 bg-white">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Supplier" : "Add New Supplier"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the supplier details below."
                : "Enter the supplier details below to create a new supplier record."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-5 px-2">
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="s_regno" className="text-sm font-medium text-gray-700 mb-1 block">
                      Registration Number *
                    </Label>
                    <Input
                      id="s_regno"
                      name="s_regno"
                      value={formData.s_regno}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter registration number (e.g., S1234)"
                      required
                      pattern="S\d{4}"
                      title="Registration number must start with 'S' followed by 4 digits (e.g., S1234)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must start with 'S' followed by 4 digits (e.g., S1234)</p>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="s_name" className="text-sm font-medium text-gray-700 mb-1 block">
                      Supplier Name *
                    </Label>
                    <Input
                      id="s_name"
                      name="s_name"
                      value={formData.s_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter supplier name"
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
                      placeholder="supplier@example.com"
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
                  <div className="bg-green-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1 block">
                      Gender
                    </Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full p-2 rounded-md border"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="maritalstatus" className="text-sm font-medium text-gray-700 mb-1 block">
                      Marital Status
                    </Label>
                    <select
                      id="maritalstatus"
                      name="maritalstatus"
                      value={formData.maritalstatus}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full p-2 rounded-md border"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="birthday" className="text-sm font-medium text-gray-700 mb-1 block">
                      Birthday
                    </Label>
                    <Input
                      id="birthday"
                      name="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <Label htmlFor="profile">Profile Picture</Label>
                <Input
                  id="profile"
                  name="profile"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.profile && typeof formData.profile === "string" && (
                  <div className="mt-2">
                    <img
                      src={formData.profile}
                      alt="Current profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

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
              {isSubmitting ? "Saving..." : isEditMode ? "Update Supplier" : "Add Supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}