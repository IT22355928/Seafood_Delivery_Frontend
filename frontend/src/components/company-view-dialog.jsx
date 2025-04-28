import React, { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, User, Mail, Phone, FileText } from "lucide-react";

const CompanyViewDialog = ({ company, triggerButton }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white rounded-lg shadow-xl border-0">
        <DialogHeader className="px-5 pt-4">
          {" "}
          {/* Added padding to align with inner content */}
          <DialogTitle>Company Details</DialogTitle>
        </DialogHeader>
        <div className="border-[3px] border-green-500 rounded-lg p-4">
          {" "}
          {/* Added green border container */}
          <Card className="p-4 mx-4 mb-4">
            {" "}
            {/* Added horizontal margins */}
            <div className="space-y-4">
              {/* Company RegNo with Icon */}
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Company RegNo
                  </Label>
                  <span className="text-lg font-medium">{company.c_regno}</span>
                </div>
              </div>

              {/* Company Name with Icon */}
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Company Name
                  </Label>
                  <span className="text-lg font-medium">{company.c_name}</span>
                </div>
              </div>

              {/* Address with Icon */}
              <div className="flex items-center">
                <div className="bg-orange-100 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Address
                  </Label>
                  <span className="text-lg font-medium">{company.address}</span>
                </div>
              </div>

              {/* Owner Name with Icon */}
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Owner Name
                  </Label>
                  <span className="text-lg font-medium">{company.o_name}</span>
                </div>
              </div>

              {/* Email with Icon */}
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Email
                  </Label>
                  <span className="text-lg font-medium">{company.email}</span>
                </div>
              </div>

              {/* Phone with Icon */}
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Phone
                  </Label>
                  <span className="text-lg font-medium">{company.phone}</span>
                </div>
              </div>

              {/* Description with Icon */}
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-500">
                    Description
                  </Label>
                  <p className="text-lg font-medium">{company.description}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <Label className="w-24">Status:</Label>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    company.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {company.status}
                </span>
              </div>
            </div>
          </Card>
          <DialogFooter className="px-4 pb-4">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="ml-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyViewDialog;
