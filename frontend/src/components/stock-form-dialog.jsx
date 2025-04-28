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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Box,
  Tag,
  MapPin,
  Hash,
  DollarSign,
  Calendar,
  Phone,
  FileText,
} from "lucide-react";

export function StockFormDialog({ stock = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    i_code: "",
    i_name: "",
    i_category: "",
    i_description: "",
    qty: "",
    u_price: "",
    t_value: "",
    s_name: "",
    d_purchase: "",
    s_contact: "",
    location: "",
    status: "active",
  });

  // Predefined categories for the dropdown
  const categories = [
    "White Fish",
    "Oily Fish",
    "Exotic/Game Fish",
    "Shrimp/Prawns",
    "Crabs",
    "Lobsters",
    "Bivalves",
    "Gastropods",
    "Cephalopods",
    "Other",
  ];

  const warehouses = [
    "Matata Warehouse",
    "Galle Warehouse",
    "Kandy Wherehouse",
    "Jaffna Warehouse",
    "Colombo Warehouse",
  ];

  const isEditMode = !!stock;

  useEffect(() => {
    if (stock) {
      setFormData({
        i_code: stock.i_code || "",
        i_name: stock.i_name || "",
        i_category: stock.i_category || "",
        i_description: stock.i_description || "",
        qty: stock.qty || "",
        u_price: stock.u_price || "",
        t_value: stock.t_value || "",
        s_name: stock.s_name || "",
        d_purchase: formatDateForInput(stock.d_purchase),
        s_contact: stock.s_contact || "",
        location: stock.location || "",
        status: stock.status || "active",
      });
    }
  }, [stock]);

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

  const validateItemCode = (code) => {
    const re = /^I\d{4}$/;
    return re.test(code);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  };

  const calculateTotalValue = () => {
    const quantity = parseFloat(formData.qty) || 0;
    const unitPrice = parseFloat(formData.u_price) || 0;
    return (quantity * unitPrice).toFixed(2);
  };

  useEffect(() => {
    if (formData.qty && formData.u_price) {
      setFormData((prev) => ({
        ...prev,
        t_value: calculateTotalValue(),
      }));
    }
  }, [formData.qty, formData.u_price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      i_category: value,
    }));
  };

  const handleWarehouseChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      location: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.i_code.trim()) {
      alert("Item code is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateItemCode(formData.i_code)) {
      alert(
        "Item code must start with 'I' followed by exactly 4 digits (e.g., I1234)"
      );
      setIsSubmitting(false);
      return;
    }
    if (!formData.i_name.trim()) {
      alert("Item name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.qty) {
      alert("Quantity is required");
      setIsSubmitting(false);
      return;
    }
    if (parseFloat(formData.qty) <= 0) {
      alert("Quantity must be greater than 0");
      setIsSubmitting(false);
      return;
    }
    if (!formData.u_price) {
      alert("Unit price is required");
      setIsSubmitting(false);
      return;
    }
    if (parseFloat(formData.u_price) <= 0) {
      alert("Unit price must be greater than 0");
      setIsSubmitting(false);
      return;
    }
    if (formData.s_contact && !validatePhone(formData.s_contact)) {
      alert("Please enter a valid 10-digit phone number for supplier contact");
      setIsSubmitting(false);
      return;
    }

    const stockData = {
      ...formData,
      qty: parseFloat(formData.qty),
      u_price: parseFloat(formData.u_price),
      t_value: parseFloat(formData.t_value || calculateTotalValue()),
      s_contact: formData.s_contact.replace(/\D/g, ""),
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/stocks/${stock._id}`,
          stockData,
          config
        );
        alert("Inventory item updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/stocks", stockData, config);
        alert("Inventory item created successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving inventory item:", error);
      let errorMessage = "An error occurred while saving the inventory item.";

      if (error.response) {
        if (error.response.data?.errors) {
          errorMessage = Object.values(error.response.data.errors)
            .map((err) => err.message || err)
            .join("\n");
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
    if (isEditMode && stock) {
      setFormData({
        i_code: stock.i_code || "",
        i_name: stock.i_name || "",
        i_category: stock.i_category || "",
        i_description: stock.i_description || "",
        qty: stock.qty || "",
        u_price: stock.u_price || "",
        t_value: stock.t_value || "",
        s_name: stock.s_name || "",
        d_purchase: formatDateForInput(stock.d_purchase),
        s_contact: stock.s_contact || "",
        location: stock.location || "",
        status: stock.status || "active",
      });
    } else {
      setFormData({
        i_code: "",
        i_name: "",
        i_category: "",
        i_description: "",
        qty: "",
        u_price: "",
        t_value: "",
        s_name: "",
        d_purchase: "",
        s_contact: "",
        location: "",
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
            {isEditMode ? (
              <Pencil className="mr-2 h-4 w-4" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isEditMode ? "Edit Item" : "Add Item"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-4 border-blue-500 h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header without border */}
          <DialogHeader className="pb-4 bg-white ">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Inventory Item" : "Add New Inventory Item"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the inventory item details below."
                : "Enter the item details below to add to inventory."}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-4 px-1">
            <div className="space-y-5 px-2">
              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="i_code"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Item Code *
                    </Label>
                    <Input
                      id="i_code"
                      name="i_code"
                      value={formData.i_code}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline-0"
                      placeholder="Enter item code (e.g., I1234)"
                      required
                      pattern="I\d{4}"
                      title="Item code must start with 'I' followed by 4 digits (e.g., I1234)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must start with 'I' followed by 4 digits (e.g., I1234)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="i_category"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Item Category *
                    </Label>
                    <Select
                      value={formData.i_category}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}
                          className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>


              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Box className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="i_name"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Item Name *
                    </Label>
                    <Input
                      id="i_name"
                      name="i_name"
                      value={formData.i_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Hash className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="qty"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Quantity(Kg) *
                    </Label>
                    <Input
                      id="qty"
                      name="qty"
                      type="number"
                      value={formData.qty}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter quantity"
                      required
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="u_price"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Unit Price(Rs) *
                    </Label>
                    <Input
                      id="u_price"
                      name="u_price"
                      type="number"
                      value={formData.u_price}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter unit price"
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="t_value"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Total Value *
                    </Label>
                    <Input
                      id="t_value"
                      name="t_value"
                      value={`Rs ${formData.t_value || calculateTotalValue()}`}
                      readOnly
                      className="border-gray-300 bg-gray-100 font-semibold"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Box className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="s_name"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Supplier Name *
                    </Label>
                    <Input
                      id="s_name"
                      name="s_name"
                      value={formData.s_name}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter supplier name"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="d_purchase"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Purchase Date *
                    </Label>
                    <Input
                      id="d_purchase"
                      name="d_purchase"
                      type="date"
                      value={formData.d_purchase}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="s_contact"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Supplier Contact *
                    </Label>
                    <Input
                      id="s_contact"
                      name="s_contact"
                      value={formData.s_contact}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter supplier phone number"
                      minLength="10"
                      maxLength="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be 10 digits
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="location"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Storage Location *
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={handleWarehouseChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.map((warehouse) => (
                          <SelectItem
                            key={warehouse}
                            value={warehouse}
                            className="hover:bg-blue-500 hover:text-blue-1000 focus:bg-blue-450"
                          >
                            {warehouse}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <Label
                      htmlFor="i_description"
                      className="text-sm font-medium text-gray-700 mb-1 block"
                    >
                      Description *
                    </Label>
                    <Textarea
                      id="i_description"
                      name="i_description"
                      value={formData.i_description}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                      placeholder="Enter item description"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-1 border-none shadow-none">
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Status
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      formData.status === "active"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, status: "active" })
                    }
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${
                        formData.status === "active"
                          ? "bg-green-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">
                      Available
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      formData.status === "inactive"
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, status: "inactive" })
                    }
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${
                        formData.status === "inactive"
                          ? "bg-red-600"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm text-gray-700">
                      Out Of Stock
                    </span>
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
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update Item"
                : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
