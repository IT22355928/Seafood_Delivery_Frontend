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
  MessageSquare,
  Star,
  User,
  Mail,
  Calendar,
  ThumbsUp,
  Plus,
  Pencil
} from "lucide-react";

export function FeedbackFormDialog({ feedback = null, triggerButton, refresh }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    rating: 0,
    comment: "",
    date: new Date().toISOString().split('T')[0] // Default to today's date
  });

  const isEditMode = !!feedback;

  useEffect(() => {
    if (feedback) {
      setFormData({
        customerName: feedback.customerName || "",
        email: feedback.email || "",
        rating: feedback.rating || 0,
        comment: feedback.comment || "",
        date: feedback.date ? feedback.date.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [feedback]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation checks
    if (!formData.customerName.trim()) {
      alert("Customer name is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      setIsSubmitting(false);
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    if (formData.rating === 0) {
      alert("Please select a rating");
      setIsSubmitting(false);
      return;
    }
    if (!formData.comment.trim()) {
      alert("Comment is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const feedbackData = {
        ...formData,
        rating: Number(formData.rating)
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/feedbacks/${feedback._id}`,
          feedbackData,
          config
        );
        alert("Feedback updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/feedbacks",
          feedbackData,
          config
        );
        alert("Feedback submitted successfully!");
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Error saving feedback:", error);
      let errorMessage = "An error occurred while saving the feedback.";
      
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
    if (isEditMode && feedback) {
      setFormData({
        customerName: feedback.customerName || "",
        email: feedback.email || "",
        rating: feedback.rating || 0,
        comment: feedback.comment || "",
        date: feedback.date ? feedback.date.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        customerName: "",
        email: "",
        rating: 0,
        comment: "",
        date: new Date().toISOString().split('T')[0]
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
          <Button className="flex items-center bg-green-600 hover:bg-green-700 text-white shadow-md transition-all duration-200">
            {isEditMode ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
            {isEditMode ? "Edit Feedback" : "Add Feedback"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-xl border-4 border-green-500">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="pb-4 bg-white">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Feedback" : "Submit Feedback"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditMode
                ? "Update the feedback details below."
                : "We value your opinion! Please share your experience with us."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Customer Name */}
            <Card className="p-1 border-none shadow-none">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="customerName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Your Name *
                  </Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 outline-0"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-1 border-none shadow-none">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-green-600" />
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
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 outline-0"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            </Card>

            {/* Rating */}
            <Card className="p-1 border-none shadow-none">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">
                    Your Rating *
                  </Label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= formData.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {formData.rating} {formData.rating === 1 ? "star" : "stars"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Date */}
            <Card className="p-1 border-none shadow-none">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1 block">
                    Date of Experience
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 outline-0"
                  />
                </div>
              </div>
            </Card>

            {/* Comment */}
            <Card className="p-1 border-none shadow-none">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="comment" className="text-sm font-medium text-gray-700 mb-1 block">
                    Your Feedback *
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 outline-0 min-h-[100px]"
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>
              </div>
            </Card>
          </div>

          <DialogFooter className="pt-4 bg-white">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isEditMode ? "Update Feedback" : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}