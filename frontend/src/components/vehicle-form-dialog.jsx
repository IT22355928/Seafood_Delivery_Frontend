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
  Plus, 
  Pencil, 
  Truck, 
  Calendar, 
  Gauge, 
  Snowflake, 
  Fuel, 
  MapPin,
  Scale,
  FileImage
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function VehicleFormDialog({ vehicle = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    licensePlate: "",
    v_type: "",
    v_model: "",
    year: "",
    refrigeration_type: "None",
    last_maintenance: "",
    delivery_area: "",
    max_load: "",
    fuel_type: "",
    certification_no: "",
    certification_expire_date: "",
    v_image: "",
    status: "active",
  });

  const vehicleTypes = ["Truck", "Mini-Truck", "Van", "Lorry", "Container", "Refrigerated Truck"];
  const vehicleModels = ["Isuzu", "Ford", "Mercedes", "Volvo", "Hino", "Nissan", "Mitsubishi"];
  const years = [
    "2024", "2023", "2022", "2021", "2020", 
    "2019", "2018", "2017", "2016", "2015", 
    "2014", "2013", "2012", "2011", "2010", 
    "2009", "2008", "2007", "2006", "2005", 
    "2004", "2003", "2002", "2001", "2000"
  ];
  const refrigerationTypes = ["None", "Basic", "Medium", "Heavy", "Ultra-low"];
  const fuelTypes = ["Diesel", "Petrol", "Electric", "Hybrid", "CNG"];
  const deliveryAreas = ["Matara", "Galle", "Anuradhapura", "Kandy", "Jaffna", "Colombo", "Hambantota", "Monaragala", "Trincomalee", "Polonnaruwa", "Moratuwa", "Ratnapura"];

  const isEditMode = !!vehicle;

  useEffect(() => {
    if (vehicle) {
      setFormData({
        licensePlate: vehicle.licensePlate || "",
        v_type: vehicle.v_type || "",
        v_model: vehicle.v_model || "",
        year: vehicle.year?.toString() || "",
        refrigeration_type: vehicle.refrigeration_type || "None",
        last_maintenance: formatDateForInput(vehicle.last_maintenance),
        delivery_area: vehicle.delivery_area || "",
        max_load: vehicle.max_load?.toString() || "",
        fuel_type: vehicle.fuel_type || "",
        certification_no: vehicle.certification_no || "",
        certification_expire_date: formatDateForInput(vehicle.certification_expire_date),
        v_image: vehicle.v_image || "",
        status: vehicle.status || "active",
      });
    }
  }, [vehicle]);

  // Helper function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // If it's a date object or ISO string
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const validateLicensePlate = (plate) => {
    const regex = /^[A-Z]{3}-\d{4}$/;
    return regex.test(plate);
  };

  const validateCertificationNumber = (certNo) => {
    const regex = /^CT\d{3}$/;
    return regex.test(certNo);
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
          v_image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation checks
    if (!formData.licensePlate.trim()) {
      alert("License plate is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateLicensePlate(formData.licensePlate)) {
      alert("License plate must be in the format XXX-XXXX (3 uppercase letters followed by hyphen and 4 digits)");
      setIsSubmitting(false);
      return;
    }
    if (!formData.v_type) {
      alert("Vehicle type is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.v_model) {
      alert("Vehicle model is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.year) {
      alert("Year is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.fuel_type) {
      alert("Fuel type is required");
      setIsSubmitting(false);
      return;
    }
    if (formData.certification_no && !validateCertificationNumber(formData.certification_no)) {
      alert("Certification number must start with 'CT' followed by 3 digits (e.g., CT123)");
      setIsSubmitting(false);
      return;
    }

    try {
      const vehicleData = {
        ...formData,
        // Ensure dates are sent as simple date strings without time
        last_maintenance: formData.last_maintenance || null,
        certification_expire_date: formData.certification_expire_date || null
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/vehicles/${vehicle._id}`,
          vehicleData,
          config
        );
        alert("Vehicle updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/vehicles",
          vehicleData,
          config
        );
        alert("Vehicle created successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving vehicle:", error);
      let errorMessage = "An error occurred while saving the vehicle.";
      
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
    if (isEditMode && vehicle) {
      setFormData({
        licensePlate: vehicle.licensePlate || "",
        v_type: vehicle.v_type || "",
        v_model: vehicle.v_model || "",
        year: vehicle.year?.toString() || "",
        refrigeration_type: vehicle.refrigeration_type || "None",
        last_maintenance: formatDateForInput(vehicle.last_maintenance),
        delivery_area: vehicle.delivery_area || "",
        max_load: vehicle.max_load?.toString() || "",
        fuel_type: vehicle.fuel_type || "",
        certification_no: vehicle.certification_no || "",
        certification_expire_date: formatDateForInput(vehicle.certification_expire_date),
        v_image: vehicle.v_image || "",
        status: vehicle.status || "active",
      });
    } else {
      setFormData({
        licensePlate: "",
        v_type: "",
        v_model: "",
        year: "",
        refrigeration_type: "None",
        last_maintenance: "",
        delivery_area: "",
        max_load: "",
        fuel_type: "",
        certification_no: "",
        certification_expire_date: "",
        v_image: "",
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
            {isEditMode ? "Edit Vehicle" : "Add Vehicle"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-4 border-blue-500 h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="pb-4 bg-white">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Vehicle" : "Add New Vehicle"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the vehicle details below."
                : "Enter the vehicle details below to create a new vehicle record."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-5 px-2">
              {/* License Plate */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="licensePlate" className="text-sm font-medium text-gray-700 mb-1 block">
                      Vehicle Number Plate *
                    </Label>
                    <Input
                      id="licensePlate"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter license plate (XXX-XXXX)"
                      required
                      maxLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: XXX-XXXX (3 uppercase letters followed by hyphen and 4 digits)</p>
                  </div>
                </div>
              </Card>

              {/* Vehicle Type */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="v_type" className="text-sm font-medium text-gray-700 mb-1 block">
                      Vehicle Type *
                    </Label>
                    <Select 
                      value={formData.v_type} 
                      onValueChange={(value) => handleSelectChange("v_type", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Vehicle Model */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Gauge className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="v_model" className="text-sm font-medium text-gray-700 mb-1 block">
                      Vehicle Model *
                    </Label>
                    <Select 
                      value={formData.v_model} 
                      onValueChange={(value) => handleSelectChange("v_model", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select vehicle model" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleModels.map((model) => (
                          <SelectItem key={model} value={model}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Manufacture Year */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="year" className="text-sm font-medium text-gray-700 mb-1 block">
                      Manufacture Year *
                    </Label>
                    <Select 
                      value={formData.year} 
                      onValueChange={(value) => handleSelectChange("year", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Refrigeration Type */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Snowflake className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="refrigeration_type" className="text-sm font-medium text-gray-700 mb-1 block">
                      Refrigeration Type *
                    </Label>
                    <Select 
                      value={formData.refrigeration_type} 
                      onValueChange={(value) => handleSelectChange("refrigeration_type", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select refrigeration type" />
                      </SelectTrigger>
                      <SelectContent>
                        {refrigerationTypes.map((type) => (
                          <SelectItem key={type} value={type}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Fuel Type */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Fuel className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="fuel_type" className="text-sm font-medium text-gray-700 mb-1 block">
                      Fuel Type *
                    </Label>
                    <Select 
                      value={formData.fuel_type} 
                      onValueChange={(value) => handleSelectChange("fuel_type", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type) => (
                          <SelectItem key={type} value={type}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Maximum Load Capacity */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="max_load" className="text-sm font-medium text-gray-700 mb-1 block">
                      Maximum Load Capacity(kg) *
                    </Label>
                    <Input
                      id="max_load"
                      name="max_load"
                      type="number"
                      value={formData.max_load}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter maximum load capacity"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Delivery Area */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="delivery_area" className="text-sm font-medium text-gray-700 mb-1 block">
                      Delivery Area *
                    </Label>
                    <Select 
                      value={formData.delivery_area} 
                      onValueChange={(value) => handleSelectChange("delivery_area", value)}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select delivery area" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryAreas.map((area) => (
                          <SelectItem key={area} value={area}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Last Maintenance Date */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="last_maintenance" className="text-sm font-medium text-gray-700 mb-1 block">
                      Last Maintenance Date *
                    </Label>
                    <Input
                      id="last_maintenance"
                      name="last_maintenance"
                      type="date"
                      value={formData.last_maintenance}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Certification Number */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileImage className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="certification_no" className="text-sm font-medium text-gray-700 mb-1 block">
                      Food Certification Number *
                    </Label>
                    <Input
                      id="certification_no"
                      name="certification_no"
                      value={formData.certification_no}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter certification number (CT123)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must start with 'CT' followed by 3 digits (e.g., CT123)</p>
                  </div>
                </div>
              </Card>

              {/* Certification Expiry Date */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="certification_expire_date" className="text-sm font-medium text-gray-700 mb-1 block">
                      Certification Expiry Date *
                    </Label>
                    <Input
                      id="certification_expire_date"
                      name="certification_expire_date"
                      type="date"
                      value={formData.certification_expire_date}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Vehicle Image */}
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileImage className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="v_image" className="text-sm font-medium text-gray-700 mb-1 block">
                      Vehicle Image *
                    </Label>
                    <Input
                      id="v_image"
                      name="v_image"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {formData.v_image && (
                      <div className="mt-2">
                        <img
                          src={formData.v_image}
                          alt="Vehicle"
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        {isEditMode && (
                          <p className="text-xs text-gray-500 mt-1">Current vehicle image</p>
                        )}
                      </div>
                    )}
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
              {isSubmitting ? "Saving..." : isEditMode ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}