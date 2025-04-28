import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSushis } from "react-icons/gi";
import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Box,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  X,
  CreditCard,
  Home,
  Download,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { jsPDF } from "jspdf";

// Steps for the checkout process
const CHECKOUT_STEPS = {
  CART: 1,
  DELIVERY: 2,
  PAYMENT: 3,
  CONFIRMATION: 4,
};

export function SeafoodItems() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [seafoodItems] = useState([
    {
      id: 1,
      itemCode: "SF-001",
      name: "Fresh Tuna Steaks",
      category: "White Fish",
      description: "Premium quality fresh tuna steaks, perfect for grilling",
      unitPrice: 2500,
      discount: 10,
      image:
        "http://truefish.com/cdn/shop/files/Tuna_-_raw_1_1200x1200.jpg?v=1729708070",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: 2,
      itemCode: "SF-002",
      name: "Jumbo Prawns",
      category: "Shrimp/Prawns",
      description: "Large, succulent prawns with excellent texture and flavor",
      unitPrice: 3200,
      discount: 15,
      image:
        "https://www.irishexaminer.com/cms_media/module_img/4945/2472800_1_articlelarge_iStock-564605044.jpg",
      stock: 200,
      status: "available",
    },
    {
      id: 3,
      itemCode: "SF-003",
      name: "Atlantic Salmon Fillet",
      category: "Oily Fish",
      description: "Fresh Atlantic salmon fillets with rich omega-3 content",
      unitPrice: 2800,
      discount: 5,
      image:
        "https://seaco-online.com/cdn/shop/files/Atlantic_Salmon_Portion.jpg?v=1725614966&width=900",
      stock: 120,
      status: "available",
    },
    {
      id: 4,
      itemCode: "SF-004",
      name: "Live Mud Crabs",
      category: "Crabs",
      description: "Fresh live mud crabs, perfect for chili crab",
      unitPrice: 1800,
      discount: 7,
      image:
        "https://www.madamseafood.com.au/cdn/shop/products/cooked-mud-crabs_24f4916d-4ea5-44c8-b9cd-733977fe76a4.jpg?v=1656398662",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: 5,
      itemCode: "SF-005",
      name: "Squid Tubes",
      category: "Cephalopods",
      description: "Cleaned squid tubes ideal for frying, grilling",
      unitPrice: 1500,
      discount: 8,
      image:
        "https://freshcatch.ae/wp-content/uploads/2020/03/squidtube-600x600.jpg",
      stock: 90,
      status: "available",
    },
    {
      id: 6,
      itemCode: "SF-006",
      name: "King Crab Legs",
      category: "Crabs",
      description: "Premium Alaskan king crab legs, sweet and succulent",
      unitPrice: 4200,
      discount: 12,
      image:
        "https://www.mainelobsternow.com/cdn/shop/files/colossal-alaskan-king-crab-legs-856319.jpg?v=1711518458&width=640",
      stock: 45,
      status: "available",
    },
    {
      id: 7,
      itemCode: "SF-007",
      name: "Sea Scallops",
      category: "Shellfish",
      description: "Fresh jumbo sea scallops with delicate texture",
      unitPrice: 3800,
      discount: 5,
      image:
        "https://www.webstaurantstore.com/uploads/buying_guide/2023/6/fresh-scallops.jpg",
      stock: 65,
      status: "available",
    },
    {
      id: 8,
      itemCode: "SF-008",
      name: "Black Tiger Shrimp",
      category: "Shrimp/Prawns",
      description: "Large black tiger shrimp with firm texture",
      unitPrice: 2900,
      discount: 10,
      image: "https://cdn.ecommercedns.uk/files/7/237157/6/42877976/prawns.jpg",
      stock: 110,
      status: "available",
    },
    {
      id: 9,
      itemCode: "SF-009",
      name: "Whole Octopus",
      category: "Cephalopods",
      description: "Tender whole octopus perfect for grilling",
      unitPrice: 2100,
      discount: 15,
      image:
        "https://www.manettas.com.au/wp-content/uploads/2017/02/unnamed-2-2.jpg",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: 10,
      itemCode: "SF-010",
      name: "Mussels in Shell",
      category: "Shellfish",
      description: "Fresh live mussels, perfect for soups and pasta",
      unitPrice: 1250,
      discount: 20,
      image:
        "https://www.alaskankingcrab.com/cdn/shop/files/alaskan-king-crab-mussels-1_1200x.jpg?v=1694631891",
      stock: 180,
      status: "available",
    },
    {
      id: 11,
      itemCode: "SF-011",
      name: "Yellowfin Tuna Loin",
      category: "Oily Fish",
      description: "Premium sushi-grade yellowfin tuna loin",
      unitPrice: 3600,
      discount: 15,
      image:
        "https://misterbutcher.ca/cdn/shop/products/tuna_loin_1_720x.jpg?v=1609012212",
      stock: 25,
      status: "available",
    },
    {
      id: 12,
      itemCode: "SF-012",
      name: "Lobster Tails",
      category: "Shellfish",
      description: "Cold water lobster tails, sweet and tender",
      unitPrice: 4800,
      discount: 8,
      image:
        "https://www.allrecipes.com/thmb/Gsqb76FLIgaW5mXzM4Kk3SpOSzM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ALR-recipe-282923-baked-lobster-tails-hero-03-ddmfs-4x3-c61ad29ab8c64a65860d25c60beb128c.jpg",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: 13,
      itemCode: "SF-013",
      name: "Barramundi Fillets",
      category: "White Fish",
      description: "Premium Australian barramundi fillets with mild flavor",
      unitPrice: 2700,
      discount: 12,
      image:
        "https://www.markwellfoods.com.au/wp-content/uploads/2022/03/barramundi-fillet-skin-on-scaled.jpg",
      stock: 75,
      status: "available",
    },
    {
      id: 14,
      itemCode: "SF-014",
      name: "Mediterranean Sea Bass",
      category: "White Fish",
      description: "Whole fresh sea bass with delicate flavor",
      unitPrice: 3100,
      discount: 5,
      image:
        "https://cdn.shopify.com/s/files/1/0258/2419/8714/files/image1_92ce2731-fea2-4014-9f6c-7d396a3f866d.jpg?v=1650361792",
      stock: 60,
      status: "available",
    },
    {
      id: 15,
      itemCode: "SF-015",
      name: "Blue Swimmer Crabs",
      category: "Crabs",
      description: "Live blue swimmer crabs with sweet meat",
      unitPrice: 2200,
      discount: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B8TeZGqm4j2j4XySV_N_frsePE5H7lNMMw&s",
      stock: 0,
      status: "out-of-stock",
    },
    {
      id: 16,
      itemCode: "SF-016",
      name: "Baby Octopus",
      category: "Cephalopods",
      description: "Tender baby octopus ideal for salads and grilling",
      unitPrice: 1950,
      discount: 15,
      image:
        "https://mfeshop.com/cdn/shop/products/BABYOCTOPUS_8b9c6e7a-158f-4eff-9723-360bf35ce277.jpg?v=1720025835",
      stock: 40,
      status: "available",
    },
    {
      id: 17,
      itemCode: "SF-017",
      name: "Tiger Prawns",
      category: "Shrimp/Prawns",
      description: "Extra large tiger prawns with firm texture",
      unitPrice: 3500,
      discount: 8,
      image: "https://www.lihiniseafood.com/images/products/tiger-prawns.jpg",
      stock: 95,
      status: "available",
    },
    {
      id: 18,
      itemCode: "SF-018",
      name: "Hokkaido Scallops",
      category: "Shellfish",
      description: "Premium Japanese scallops with buttery texture",
      unitPrice: 4200,
      discount: 10,
      image:
        "https://opfishmarket.com/cdn/shop/products/Scallop_02_1200x1200.jpg?v=1616680794",
      stock: 0,
      status: "out-of-stock",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [checkoutStep, setCheckoutStep] = useState(CHECKOUT_STEPS.CART);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [orderNumber] = useState(
    `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  );

  // Filter items based on search term
  const filteredItems = seafoodItems.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Validate phone number
  const validatePhone = (phone) => {
    const regex = /^(?:\+94|0)[1-9][0-9]{8}$/;
    return regex.test(phone);
  };

  // Validate card number
  const validateCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s+/g, "");
    const regex = /^[0-9]{13,19}$/;
    return regex.test(cleaned);
  };

  // Validate expiry date
  const validateExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year) < currentYear) return false;
    if (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      return false;

    return true;
  };

  // Validate CVV
  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  };

  // View item details
  const handleViewItem = (itemId) => {
    const item = seafoodItems.find((i) => i.id === itemId);
    if (item) {
      setSelectedItem(item);
    }
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    const newQuantity = quantities[item.id] || 1;

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + newQuantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: newQuantity }]);
    }

    toast.success(`${newQuantity} ${item.name} added to cart`);
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    toast.error("Item removed from cart");
  };

  // Update item quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Close item details modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "out-of-stock":
        return "bg-red-500 hover:bg-red-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return (
        total +
        calculateDiscountedPrice(item.unitPrice, item.discount) * item.quantity
      );
    }, 0);
  };

  // Handle delivery info change
  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value)
          ? ""
          : "Please enter a valid Sri Lankan phone number (e.g., +94761234567 or 0761234567)",
      });
    }

    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };

  // Handle payment info change
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "cardNumber") {
      // Format card number with spaces every 4 digits
      let formattedValue = value
        .replace(/\s+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19)
        formattedValue = formattedValue.substring(0, 19);

      setPaymentInfo({
        ...paymentInfo,
        cardNumber: formattedValue,
      });

      newErrors.cardNumber = validateCardNumber(formattedValue)
        ? ""
        : "Please enter a valid card number (13-19 digits)";
    } else if (name === "expiry") {
      // Format expiry date with slash
      let formattedValue = value;
      if (value.length === 2 && !value.includes("/")) {
        formattedValue = value + "/";
      } else if (value.length > 5) {
        formattedValue = value.substring(0, 5);
      }

      setPaymentInfo({
        ...paymentInfo,
        expiry: formattedValue,
      });

      newErrors.expiry = validateExpiry(formattedValue)
        ? ""
        : "Please enter a valid expiry date (MM/YY)";
    } else if (name === "cvv") {
      // Limit CVV to 4 digits
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 4)
        formattedValue = formattedValue.substring(0, 4);

      setPaymentInfo({
        ...paymentInfo,
        cvv: formattedValue,
      });

      newErrors.cvv = validateCVV(formattedValue)
        ? ""
        : "Please enter a valid CVV (3-4 digits)";
    } else {
      setPaymentInfo({
        ...paymentInfo,
        [name]: value,
      });
    }

    setErrors(newErrors);
  };

  // Proceed to next checkout step
  const proceedToNextStep = () => {
    if (checkoutStep === CHECKOUT_STEPS.DELIVERY) {
      if (!validatePhone(deliveryInfo.phone)) {
        setErrors({
          ...errors,
          phone:
            "Please enter a valid Sri Lankan phone number (e.g., +94761234567 or 0761234567)",
        });
        return;
      }
    }

    if (checkoutStep < CHECKOUT_STEPS.CONFIRMATION) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  // Go back to previous checkout step
  const goBackToPreviousStep = () => {
    if (checkoutStep > CHECKOUT_STEPS.CART) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  // Place order
  const placeOrder = () => {
    // Validate all payment fields
    if (!validateCardNumber(paymentInfo.cardNumber)) {
      setErrors({
        ...errors,
        cardNumber: "Please enter a valid card number",
      });
      return;
    }

    if (!validateExpiry(paymentInfo.expiry)) {
      setErrors({
        ...errors,
        expiry: "Please enter a valid expiry date",
      });
      return;
    }

    if (!validateCVV(paymentInfo.cvv)) {
      setErrors({
        ...errors,
        cvv: "Please enter a valid CVV",
      });
      return;
    }

    // In a real app, you would send this data to your backend
    const order = {
      items: cartItems,
      deliveryInfo,
      paymentInfo,
      total: getTotalPrice(),
      orderDate: new Date().toISOString(),
      orderNumber: orderNumber,
    };

    console.log("Order placed:", order);
    setOrderConfirmed(true);
    proceedToNextStep();
  };

  // Reset cart and start new order
  const startNewOrder = () => {
    setCartItems([]);
    setCheckoutStep(CHECKOUT_STEPS.CART);
    setDeliveryInfo({
      name: "",
      address: "",
      phone: "",
      notes: "",
    });
    setPaymentInfo({
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
    });
    setOrderConfirmed(false);
    setIsCartOpen(false);
    setErrors({
      phone: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
  };

  // Download order summary as PDF
  const downloadOrderSummary = () => {
    const doc = new jsPDF();

    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(40, 103, 178);
    doc.text("FreshMalu.lk Seafood Market", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Order Purchase Summary", 105, 30, { align: "center" });

    // Order details
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Order Number: ${orderNumber}`, 14, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 46);
    doc.text(`Customer: ${deliveryInfo.name}`, 14, 52);

    // Line separator
    doc.line(14, 58, 196, 58);

    // Order items header
    doc.setFontSize(10);
    doc.setTextColor(40, 103, 178);
    doc.text("Item", 14, 66);
    doc.text("Qty", 120, 66);
    doc.text("Price", 160, 66);
    doc.text("Total", 180, 66);

    // Order items
    let y = 74;
    cartItems.forEach((item) => {
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(item.name, 14, y);
      doc.text(item.quantity.toString(), 120, y);
      doc.text(
        `Rs ${calculateDiscountedPrice(
          item.unitPrice,
          item.discount
        ).toLocaleString()}`,
        160,
        y
      );
      doc.text(
        `Rs ${(
          calculateDiscountedPrice(item.unitPrice, item.discount) *
          item.quantity
        ).toLocaleString()}`,
        180,
        y
      );
      y += 6;
    });

    // Line separator
    doc.line(14, y + 4, 196, y + 4);
    y += 10;

    // Totals
    doc.setFontSize(10);
    doc.text("Subtotal:", 160, y);
    doc.text(`Rs ${getTotalPrice().toLocaleString()}`, 180, y);
    y += 6;

    doc.text("Delivery: ", 160, y);
    doc.text("Rs 500.00", 180, y);
    y += 6;

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text("Total:", 160, y);
    doc.text(`Rs ${(getTotalPrice() + 500).toLocaleString()}`, 180, y);
    y += 10;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your order!", 105, 280, { align: "center" });
    doc.text(
      "FreshMalu.lk Seafood Market - Fresh from the ocean to your table",
      105,
      286,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`order-summary-${orderNumber}.pdf`);
  };

  // Render checkout progress
  const renderCheckoutProgress = () => {
    const progressValue =
      (checkoutStep / Object.keys(CHECKOUT_STEPS).length) * 100;
    return (
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          {Object.entries(CHECKOUT_STEPS).map(([key, value]) => (
            <div
              key={key}
              className={`flex flex-col items-center ${
                checkoutStep >= value ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep >= value
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
              >
                {value}
              </div>
              <span className="text-xs mt-1 capitalize">
                {key.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
    );
  };

  // Render cart content
  const renderCartContent = () => (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-2 border rounded-lg"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-muted-foreground">
              Rs{" "}
              {calculateDiscountedPrice(
                item.unitPrice,
                item.discount
              ).toLocaleString()}{" "}
              each
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-20 text-right font-medium">
            Rs{" "}
            {(
              calculateDiscountedPrice(item.unitPrice, item.discount) *
              item.quantity
            ).toLocaleString()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>Rs {getTotalPrice().toLocaleString()}</span>
        </div>

        <Button
          className="w-full mt-4 bg-green-600 hover:bg-green-700"
          onClick={proceedToNextStep}
          disabled={cartItems.length === 0}
        >
          Proceed to Delivery
        </Button>
      </div>
    </div>
  );

  // Render delivery form
  const renderDeliveryForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            name="name"
            value={deliveryInfo.name}
            onChange={handleDeliveryInfoChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            name="phone"
            value={deliveryInfo.phone}
            onChange={handleDeliveryInfoChange}
            placeholder="+94 76 123 4567"
            required
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Delivery Address
        </label>
        <Input
          name="address"
          value={deliveryInfo.address}
          onChange={handleDeliveryInfoChange}
          placeholder="123 Main St, Colombo"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Delivery Notes (Optional)
        </label>
        <Input
          name="notes"
          value={deliveryInfo.notes}
          onChange={handleDeliveryInfoChange}
          placeholder="Special instructions for delivery"
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goBackToPreviousStep}>
          Back to Cart
        </Button>
        <Button
          onClick={proceedToNextStep}
          disabled={
            !deliveryInfo.name ||
            !deliveryInfo.address ||
            !deliveryInfo.phone ||
            errors.phone
          }
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  // Render payment form
  const renderPaymentForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <Input
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentInfoChange}
          placeholder="1234 5678 9012 3456"
          required
        />
        {errors.cardNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <Input
            name="expiry"
            value={paymentInfo.expiry}
            onChange={handlePaymentInfoChange}
            placeholder="MM/YY"
            required
          />
          {errors.expiry && (
            <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <Input
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentInfoChange}
            placeholder="123"
            required
          />
          {errors.cvv && (
            <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Card Holder Name
        </label>
        <Input
          name="nameOnCard"
          value={paymentInfo.nameOnCard}
          onChange={handlePaymentInfoChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-medium mb-2">
          <span>Subtotal:</span>
          <span>Rs {getTotalPrice().toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-medium mb-2">
          <span>Delivery Fee:</span>
          <span>Rs 500.00</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span>Rs {(getTotalPrice() + 500).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goBackToPreviousStep}>
          Back to Delivery
        </Button>
        <Button
          onClick={placeOrder}
          disabled={
            !paymentInfo.cardNumber ||
            !paymentInfo.expiry ||
            !paymentInfo.cvv ||
            !paymentInfo.nameOnCard ||
            errors.cardNumber ||
            errors.expiry ||
            errors.cvv
          }
          className="bg-green-600 hover:bg-green-700"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Place Order
        </Button>
      </div>
    </div>
  );

  // Render order confirmation
  const renderOrderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-100 text-green-600 p-4 rounded-full inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold">Order Confirmed!</h3>
      <p className="text-muted-foreground">
        Thank you for your order. We've sent a confirmation email with your
        order details.
      </p>
      <div className="border rounded-lg p-4 text-left">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Order Summary</h4>
          <span className="text-sm text-muted-foreground">#{orderNumber}</span>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between py-1">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>
              Rs{" "}
              {(
                calculateDiscountedPrice(item.unitPrice, item.discount) *
                item.quantity
              ).toLocaleString()}
            </span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 font-medium">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Rs {getTotalPrice().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>Rs 500.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>Rs {(getTotalPrice() + 500).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Delivery Information</h4>
        <p>{deliveryInfo.name}</p>
        <p>{deliveryInfo.address}</p>
        <p>{deliveryInfo.phone}</p>
        {deliveryInfo.notes && (
          <p className="mt-2">Notes: {deliveryInfo.notes}</p>
        )}
      </div>
      <div className="flex gap-4 justify-center">
        <Button onClick={startNewOrder} className="mt-4">
          <Home className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>
        <Button
          onClick={downloadOrderSummary}
          variant="outline"
          className="mt-4"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Summary
        </Button>
      </div>
    </div>
  );

  // Render current checkout step
  const renderCurrentStep = () => {
    switch (checkoutStep) {
      case CHECKOUT_STEPS.DELIVERY:
        return renderDeliveryForm();
      case CHECKOUT_STEPS.PAYMENT:
        return renderPaymentForm();
      case CHECKOUT_STEPS.CONFIRMATION:
        return renderOrderConfirmation();
      default:
        return renderCartContent();
    }
  };

  return (
    <div className="bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600 text-left flex items-center">
                  <GiSushis className="mr-2 text-2xl text-blue-700" />
                  FRESHMALU.LK
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link
                  to="/homepage"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-10"
                >
                  Home
                </Link>
                <Link
                  to="/seafooditems"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Shop
                </Link>
                <Link
                  to="/aboutus"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contactus"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/feedbacks"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Feedback
                </Link>
                <Link
                  to="/ratings"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Ratings
                </Link>
              </div>
            </div>

            <div className="hidden md:flex md:items-center gap-6">
            <div className="hidden md:flex md:items-center gap-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View cart</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <Link
                to="/chatbot"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat Support
              </Link>
            </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => {
                      localStorage.removeItem("isAuthenticated");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/seafooditems"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Shop
              </Link>
              <Link
                to="/aboutus"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/contactus"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Contact
              </Link>
              <Link
                to="/feedbacks"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Feedback
              </Link>
              <Link
                to="/ratings"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Ratings
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <button className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">View cart</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* FREE Promotional Banner */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold tracking-wider">FREE</div>
              <div className="text-sm">Delivery over LKR 15000</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold tracking-wider">FREE</div>
              <div className="text-sm">Returns within 30 days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold tracking-wider">FREE</div>
              <div className="text-sm">Recipe guide with every order</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <Toaster position="top-right" richColors />

        {/* Title and action buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center">
              <Box className="mr-2 h-6 w-6" />
              Seafood Products
              <Badge className="ml-3">{filteredItems.length}</Badge>
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse our premium selection of fresh seafood
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search seafood..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {checkoutStep === CHECKOUT_STEPS.CART && "Shopping Cart"}
                    {checkoutStep === CHECKOUT_STEPS.DELIVERY &&
                      "Delivery Information"}
                    {checkoutStep === CHECKOUT_STEPS.PAYMENT &&
                      "Payment Details"}
                    {checkoutStep === CHECKOUT_STEPS.CONFIRMATION &&
                      "Order Confirmation"}
                  </DialogTitle>
                </DialogHeader>

                {checkoutStep !== CHECKOUT_STEPS.CART &&
                  renderCheckoutProgress()}

                {cartItems.length > 0 ||
                checkoutStep === CHECKOUT_STEPS.CONFIRMATION ? (
                  renderCurrentStep()
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Seafood items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow h-full flex flex-col border-2 border-blue-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Seafood+Image";
                    }}
                  />
                  {item.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                      {item.discount}% OFF
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Category:</span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Item Code:</span>
                    <span className="font-semibold">{item.itemCode}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Price:</span>
                    <div className="flex items-center gap-2">
                      {item.discount > 0 && (
                        <span className="text-xs line-through text-gray-500">
                          Rs {item.unitPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="font-semibold text-green-600">
                        Rs{" "}
                        {calculateDiscountedPrice(
                          item.unitPrice,
                          item.discount
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge className={`text-xs ${getStatusBadge(item.status)}`}>
                      {item.status === "available"
                        ? "In Stock"
                        : "Out of Stock"}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [item.id]: Math.max(
                            1,
                            (quantities[item.id] || 1) - 1
                          ),
                        })
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">
                      {quantities[item.id] || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [item.id]: (quantities[item.id] || 1) + 1,
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleViewItem(item.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md"
                    disabled={item.status !== "available"}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {seafoodItems.length === 0
                    ? "Loading seafood items..."
                    : "No matching items found"}
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Item Details Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[525px] sm:max-h-[720px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedItem?.name} Details
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <Card className="border-2 border-green-500 h-[628px] flex flex-col relative">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400?text=Seafood+Image";
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Description:</p>
                      <p>{selectedItem.description}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <Badge
                        className={`${getStatusBadge(selectedItem.status)}`}
                      >
                        {selectedItem.status === "available"
                          ? "In Stock"
                          : "Out of Stock"}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">Category:</p>
                      <Badge variant="outline">{selectedItem.category}</Badge>
                    </div>
                    <div>
                      <p className="font-medium">Item Code:</p>
                      <p>{selectedItem.itemCode}</p>
                    </div>
                    <div>
                      <p className="font-medium">Original Price:</p>
                      <p>Rs {selectedItem.unitPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Discount:</p>
                      <p className="text-red-600">
                        {selectedItem.discount > 0
                          ? `${selectedItem.discount}% OFF`
                          : "No discount"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Current Price:</p>
                      <p className="font-bold text-green-600">
                        Rs{" "}
                        {calculateDiscountedPrice(
                          selectedItem.unitPrice,
                          selectedItem.discount
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Stock Available:</p>
                      <p>{selectedItem.stock} kg</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-500 h-8"
                  >
                    Close
                  </Button>
                </CardFooter>
              </Card>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Colorful Footer with Background Image */}
      <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  FRESHMALU
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Premium seafood delivered fresh to your doorstep. We source
                sustainably and deliver with care to ensure ocean-fresh quality
                every time.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wider text-blue-400 mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/seafooditems"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span>Shop</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedbacks"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span>Feedback</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ratings"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    <span>Ratings</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service Column */}
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wider text-blue-400 mb-6">
                Customer Service
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Shipping Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>Returns & Refunds</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-start"
                  >
                    <svg
                      className="w-4 h-4 mt-1 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Terms & Conditions</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wider text-blue-400 mb-6">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    N0 35/2, Kumarathunga Mawatha,
                    <br />
                    Colombo 05, Sri Lanka
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <span className="text-gray-300 text-sm">
                      +94 77 678 4455
                    </span>
                    <p className="text-gray-500 text-xs mt-1">
                      Mon-Fri: 9AM-6PM
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-300 text-sm">
                    info@freshmalu.lk
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} FRESHMALU.LK. All rights
                reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SeafoodItems;