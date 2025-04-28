import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiSushis } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Star, Truck, Box, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Ratings() {

  const navigate = useNavigate();
  // Sample product ratings data
  const [productRatings, setProductRatings] = useState([
    {
      id: 1,
      productCode: "P001",
      productName: "Fresh Tuna Steaks",
      image:
        "https://www.familifood.com/cdn/shop/files/familifood-gourmet-tuna-steak.webp?v=1727441090",
      averageRating: 4.5,
      totalRatings: 24,
      category: "Fresh Fish",
    },
    {
      id: 2,
      productCode: "P002",
      productName: "Atlantic Salmon Fillets",
      image:
        "https://www.charliesmeat.com/cdn/shop/products/SalmonPortionshutterstock_1709265754sm.jpg?v=1621688968&width=713",
      averageRating: 4.8,
      totalRatings: 32,
      category: "Fresh Fish",
    },
    {
      id: 3,
      productCode: "P003",
      productName: "Jumbo Tiger Prawns",
      image:
        "https://eatfresh.sg/cdn/shop/products/jumbo-wild-caught-sea-tiger-prawn_700x.jpg?v=1655046116",
      averageRating: 4.2,
      totalRatings: 18,
      category: "Shellfish",
    },
    {
      id: 4,
      productCode: "P004",
      productName: "Calamari Rings",
      image:
        "https://www.acouplecooks.com/wp-content/uploads/2020/06/Grilled-Tuna-003.jpg",
      averageRating: 3.9,
      totalRatings: 12,
      category: "Cephalopods",
    },
    {
      id: 5,
      productCode: "P005",
      productName: "Premium Sardines",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2W62Ad3oUufT39pe-_Mb9mHW61J7PD67eE2QVhlSYM0AQs4bmwDBsEFcdaBdObwpDOqk&usqp=CAU",
      averageRating: 4.1,
      totalRatings: 28,
      category: "Canned",
    },
    {
      id: 6,
      productCode: "P006",
      productName: "Wild Cod Fillets",
      image:
        "https://www.epicureanseafood.com/cdn/shop/products/P-Cod_ES_3.0.jpg?v=1675476161",
      averageRating: 4.3,
      totalRatings: 19,
      category: "White Fish",
    },
    {
      id: 7,
      productCode: "P007",
      productName: "Fresh Oysters (Dozen)",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyqOlzr_MveacQRqY52WDw6dbR5jZjqHxMg&s",
      averageRating: 4.6,
      totalRatings: 22,
      category: "Bivalves",
    },
    {
      id: 8,
      productCode: "P008",
      productName: "Whole Lobster (1.5lb)",
      image:
        "https://www.keylargofisheries.com/cdn/shop/products/key_largo_fisheries_lobster_555.jpg?v=1678742524",
      averageRating: 4.7,
      totalRatings: 15,
      category: "Crustaceans",
    },
    {
      id: 9,
      productCode: "P009",
      productName: "Frozen Scallops",
      image: "https://i.ytimg.com/vi/Frqt5bO-1XM/maxresdefault.jpg",
      averageRating: 4.4,
      totalRatings: 21,
      category: "Mollusks",
    },
    {
      id: 10,
      productCode: "P010",
      productName: "Smoked Mackerel",
      image:
        "https://st4.depositphotos.com/13503176/22106/i/450/depositphotos_221060266-stock-photo-yellow-tail-scad-decapterus-maruadsi.jpg",
      averageRating: 4.0,
      totalRatings: 17,
      category: "Smoked Fish",
    },
  ]);

  // Sample driver ratings data
  const [driverRatings, setDriverRatings] = useState([
    {
      id: 1,
      driverId: "D001",
      driverName: "Nimal Perera",
      image:
        "https://media.istockphoto.com/id/1626178861/photo/happy-handsome-young-business-man-looking-at-camera-in-office-headshot-portrait.jpg?s=612x612&w=0&k=20&c=HXVUJ9j0EaL6MxaNFJKD7UX_vn13SAJ--1jtFITGhyc=",
      averageRating: 4.7,
      totalRatings: 45,
      vehicleNumber: "WP CAB 1234",
    },
    {
      id: 2,
      driverId: "D002",
      driverName: "Kamal Silva",
      image:
        "https://media.istockphoto.com/id/2149706485/photo/indian-or-latin-confident-middle-age-male-entrepreneur-businessman-holding-mobile-cell-phone.jpg?s=612x612&w=0&k=20&c=SZNcl4wlrMF9GPwyPOxI3H-pMUDYGsiJ5FCNco3MHMk=",
      averageRating: 4.9,
      totalRatings: 38,
      vehicleNumber: "GP DEF 5678",
    },
    {
      id: 3,
      driverId: "D003",
      driverName: "Sunil Fernando",
      image:
        "https://media.istockphoto.com/id/1501770003/photo/happy-handsome-young-indian-man-head-shot-front-portrait.jpg?s=612x612&w=0&k=20&c=P2toTbaknymA7vf28IQNa-3xrlUjPXLFqvN2Zra8_nw=",
      averageRating: 4.3,
      totalRatings: 29,
      vehicleNumber: "SP GHI 9012",
    },
    {
      id: 4,
      driverId: "D004",
      driverName: "Amal Bandara",
      image:
        "https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=",
      averageRating: 4.5,
      totalRatings: 31,
      vehicleNumber: "NP JKL 3456",
    },
    {
      id: 5,
      driverId: "D005",
      driverName: "Ruwan Jayasuriya",
      image:
        "https://media.istockphoto.com/id/1483752333/photo/businessman-in-black-suit-posing-confidently-on-isolated-background-fervent.jpg?s=612x612&w=0&k=20&c=69RagMW6nl8z0WRCwqir2KZmwhB4ZBndb4z3WkX1jm8=",
      averageRating: 4.6,
      totalRatings: 42,
      vehicleNumber: "CP MNO 7890",
    },
    {
      id: 6,
      driverId: "D006",
      driverName: "Asanka Gunawardena",
      image:
        "https://media.istockphoto.com/id/1308963275/photo/head-shot-portrait-smiling-businessman-wearing-suit-looking-at-camera.jpg?s=612x612&w=0&k=20&c=eS4QOT3mpBAadUKdF86JKE0EOHsg6gMQ17qD6by57qc=",
      averageRating: 4.8,
      totalRatings: 52,
      vehicleNumber: "NC PQR 2345",
    },
    {
      id: 7,
      driverId: "D007",
      driverName: "Dinesh Rathnayake",
      image:
        "https://media.istockphoto.com/id/1074638206/photo/side-view-long-beard-business-man-portrait.jpg?s=612x612&w=0&k=20&c=3CXnWtuXukFWvfiepdmohttsVe3GzF8q6zKR5SGp92U=",
      averageRating: 4.4,
      totalRatings: 27,
      vehicleNumber: "SG STU 6789",
    },
    {
      id: 8,
      driverId: "D008",
      driverName: "Priyantha Kumarasiri",
      image:
        "https://media.istockphoto.com/id/1424912588/photo/happy-successful-business-leader-in-glasses-head-shot.jpg?s=612x612&w=0&k=20&c=GizPOAVVozzV4PVM77--TREaf1llXST2_n0V58-hEiY=",
      averageRating: 4.2,
      totalRatings: 33,
      vehicleNumber: "KL VWX 0123",
    },
    {
      id: 9,
      driverId: "D009",
      driverName: "Sampath Kumara",
      image:
        "https://media.istockphoto.com/id/1837124887/photo/portrait-smile-and-black-man-in-office-for-business-startup-company-or-creative-workplace.jpg?s=612x612&w=0&k=20&c=HvSbgKpwQiRqX8JjGv_ShFl2O6vFvKustUYNvm3jO1s=",
      averageRating: 4.9,
      totalRatings: 48,
      vehicleNumber: "AB YZA 4567",
    },
    {
      id: 10,
      driverId: "D010",
      driverName: "Lasith Malinga",
      image:
        "https://media.istockphoto.com/id/1407283770/photo/headshot-webcam-portrait-successful-african-businessman-make-video-call.jpg?s=612x612&w=0&k=20&c=aMJuLeg8NmqSc6zH9U_oxpRLUkr3BdVm8xqRpmBs1ik=",
      averageRating: 5.0,
      totalRatings: 65,
      vehicleNumber: "CM BCD 8901",
    },
  ]);

  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [driverSearchTerm, setDriverSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [ratingType, setRatingType] = useState(""); // "product" or "driver"
  const [newRating, setNewRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState(null);
  const [showSubmittedCard, setShowSubmittedCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = productRatings.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(productSearchTerm.toLowerCase()) ||
      product.productCode
        .toLowerCase()
        .includes(productSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const filteredDrivers = driverRatings.filter(
    (driver) =>
      driver.driverName
        .toLowerCase()
        .includes(driverSearchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(driverSearchTerm.toLowerCase()) ||
      driver.vehicleNumber
        .toLowerCase()
        .includes(driverSearchTerm.toLowerCase())
  );

  const handleViewRating = (item, type) => {
    setSelectedRating(item);
    setRatingType(type);
    setShowSubmittedCard(false);
    setNewRating(0);
  };

  const handleCloseModal = () => {
    setSelectedRating(null);
    setRatingType("");
    setNewRating(0);
    setShowSubmittedCard(false);
  };

  const calculateNewAverage = (currentAvg, totalRatings, newRating) => {
    const currentTotal = currentAvg * totalRatings;
    return (currentTotal + newRating) / (totalRatings + 1);
  };

  const handleRate = () => {
    // Update the rating in the appropriate array
    if (ratingType === "product") {
      const updatedProducts = productRatings.map((product) =>
        product.id === selectedRating.id
          ? {
              ...product,
              averageRating: calculateNewAverage(
                product.averageRating,
                product.totalRatings,
                newRating
              ),
              totalRatings: product.totalRatings + 1,
            }
          : product
      );
      setProductRatings(updatedProducts);
    } else {
      const updatedDrivers = driverRatings.map((driver) =>
        driver.id === selectedRating.id
          ? {
              ...driver,
              averageRating: calculateNewAverage(
                driver.averageRating,
                driver.totalRatings,
                newRating
              ),
              totalRatings: driver.totalRatings + 1,
            }
          : driver
      );
      setDriverRatings(updatedDrivers);
    }

    // Store the submitted rating for display
    setSubmittedRating({
      ...selectedRating,
      userRating: newRating,
      type: ratingType,
    });
    setShowSubmittedCard(true);
  };

  const renderStars = (rating, size = "h-4 w-4") => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${size} text-yellow-500 fill-yellow-500`}
          />
        ))}
        {hasHalfStar && (
          <div className="relative" style={{ width: size, height: size }}>
            <Star className={`${size} text-gray-300`} />
            <Star
              className={`${size} text-yellow-500 fill-yellow-500 absolute top-0 left-0`}
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${size} text-gray-300`} />
        ))}
        <span className="ml-1 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const renderRatingInput = () => {
    return (
      <div className="flex items-center justify-center space-x-1 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setNewRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= newRating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
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
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-10"
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
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center">
              <Star className="mr-2 h-6 w-6" />
              Customer Ratings
            </h2>
            <p className="text-muted-foreground mt-1">
              View and manage product and driver ratings
            </p>
          </div>
        </div>

        {/* Product Ratings Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold flex items-center">
              <Box className="mr-2 h-5 w-5" />
              Product Ratings
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search products..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Product cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow h-[420px] flex flex-col border-2 border-blue-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Product+Image";
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {product.productName}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.productCode} • {product.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Average Rating:
                      </span>
                      {renderStars(product.averageRating)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium">
                        Total Ratings:
                      </span>
                      <Badge variant="outline">{product.totalRatings}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => handleViewRating(product, "product")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Rate Product
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">
                    {productRatings.length === 0
                      ? "Loading products..."
                      : "No matching products found"}
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Driver Ratings Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Driver Ratings
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search drivers..."
                value={driverSearchTerm}
                onChange={(e) => setDriverSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Driver cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <Card
                  key={driver.id}
                  className="hover:shadow-lg transition-shadow h-[420px] flex flex-col border-2 border-green-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={driver.image}
                      alt={driver.driverName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Driver+Photo";
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {driver.driverName}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {driver.driverId} • {driver.vehicleNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Average Rating:
                      </span>
                      {renderStars(driver.averageRating)}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium">
                        Total Ratings:
                      </span>
                      <Badge variant="outline">{driver.totalRatings}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => handleViewRating(driver, "driver")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Rate Driver
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">
                    {driverRatings.length === 0
                      ? "Loading drivers..."
                      : "No matching drivers found"}
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Rating Dialog */}
        <Dialog open={!!selectedRating} onOpenChange={handleCloseModal}>
          <DialogContent className="h-[680px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {showSubmittedCard ? "Rating Submitted" : "Rate "}
                {!showSubmittedCard &&
                  (ratingType === "product"
                    ? selectedRating?.productName
                    : selectedRating?.driverName)}
              </DialogTitle>
            </DialogHeader>

            {selectedRating && (
              <Card className="border-2 border-purple-500 h-[600px] flex flex-col">
                {showSubmittedCard ? (
                  <CardContent className="p-6 space-y-4 flex flex-col items-center justify-center h-full">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <Star className="h-16 w-16 text-yellow-500 fill-yellow-500" />
                      </div>
                      <h3 className="text-2xl font-bold">Thank You!</h3>
                      <p className="text-lg">
                        You rated{" "}
                        <span className="font-semibold">
                          {submittedRating.type === "product"
                            ? submittedRating.productName
                            : submittedRating.driverName}
                        </span>{" "}
                        with:
                      </p>
                      <div className="flex justify-center">
                        {renderStars(submittedRating.userRating, "h-8 w-8")}
                      </div>
                      <p className="text-muted-foreground">
                        Your rating has been recorded.
                      </p>
                      <Button
                        onClick={handleCloseModal}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardContent className="p-6 space-y-4">
                      <div
                        className="flex flex-col items-center mb-4"
                        style={{ height: "160px" }}
                      >
                        <img
                          src={selectedRating.image}
                          alt={
                            ratingType === "product"
                              ? selectedRating.productName
                              : selectedRating.driverName
                          }
                          className="w-full h-full object-contain rounded-lg bg-gray-100"
                          onError={(e) => {
                            e.target.src =
                              ratingType === "product"
                                ? "https://via.placeholder.com/600x400?text=Product+Image"
                                : "https://via.placeholder.com/600x400?text=Driver+Photo";
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <p className="font-medium">
                            {ratingType === "product"
                              ? "Product Name:"
                              : "Driver Name:"}
                          </p>
                          <p>
                            {ratingType === "product"
                              ? selectedRating.productName
                              : selectedRating.driverName}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">
                            {ratingType === "product"
                              ? "Product Code:"
                              : "Driver ID:"}
                          </p>
                          <Badge variant="outline">
                            {ratingType === "product"
                              ? selectedRating.productCode
                              : selectedRating.driverId}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">Current Average Rating:</p>
                          {renderStars(selectedRating.averageRating, "h-6 w-6")}
                        </div>
                        <div>
                          <p className="font-medium">Total Ratings:</p>
                          <p>{selectedRating.totalRatings}</p>
                        </div>

                        <div>
                          <p className="font-medium text-center mb-2">
                            Your Rating:
                          </p>
                          {renderRatingInput()}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={handleCloseModal}
                        variant="outline"
                        className="border-gray-600 text-gray-600 hover:bg-gray-100 h-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRate}
                        disabled={newRating === 0}
                        className="bg-purple-600 hover:bg-purple-700 text-white h-8"
                      >
                        Submit Rating
                      </Button>
                    </CardFooter>
                  </>
                )}
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
