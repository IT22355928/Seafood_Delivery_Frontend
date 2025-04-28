import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import {
  FaShippingFast,
  FaCreditCard,
  FaMapMarkerAlt,
  FaLeaf,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
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
import { IoIosRestaurant } from "react-icons/io";
import { GiSushis, GiFishCooked } from "react-icons/gi";
import { MdOutlineLocalOffer, MdPayment, MdSecurity } from "react-icons/md";
import { BiFoodMenu, BiTime } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";

const Chatbot = () => {
  // Chatbot state and functions
  const [messages, setMessages] = useState([
    {
      text: "Welcome to FRESHMALU.LK Seafood Delivery! 🐟 How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Enhanced knowledge base with responses covering all aspects of the system
  const botResponses = {
    greetings: [
      "Hello! 👋 Welcome to FRESHMALU.LK. How can I assist you today?",
      "Hi there! Ready for some fresh Sri Lankan seafood? 🦐 How can I help?",
      "Welcome to FRESHMALU.LK! We have the freshest seafood in Sri Lanka. What would you like to know?",
      "Ayubowan! 👐 Our seafood was caught just this morning. How may I help you?",
    ],
    menu: {
      response: "We offer a wide variety of fresh Sri Lankan seafood:",
      options: [
        {
          emoji: "🦞",
          item: "Live Lobsters",
          price: "LKR 4500/kg",
          popular: true,
        },
        {
          emoji: "🦀",
          item: "Fresh Crabs",
          price: "LKR 3200/kg",
          popular: true,
        },
        {
          emoji: "🐟",
          item: "Tuna Steaks",
          price: "LKR 2800/kg",
          popular: true,
        },
        {
          emoji: "🦐",
          item: "Jumbo Prawns",
          price: "LKR 2200/kg",
          popular: true,
        },
        {
          emoji: "🦪",
          item: "Fresh Oysters",
          price: "LKR 150 each",
          popular: false,
        },
        { emoji: "🐙", item: "Octopus", price: "LKR 3500/kg", popular: false },
        { emoji: "🐚", item: "Scallops", price: "LKR 4000/kg", popular: true },
        {
          emoji: "🐡",
          item: "Seer Fish",
          price: "LKR 3800/kg",
          popular: false,
        },
        { emoji: "🦑", item: "Squid", price: "LKR 3000/kg", popular: false },
      ],
      followUp:
        "Would you like recommendations or to know about today's specials?",
    },
    delivery: {
      response:
        "We deliver daily from 8AM to 10PM across Sri Lanka. Our delivery options:",
      options: [
        { type: "Standard", time: "4-6 hours", price: "LKR 500", icon: "🚚" },
        { type: "Express", time: "2 hours", price: "LKR 1000", icon: "⚡" },
        {
          type: "Scheduled",
          time: "Choose your time",
          price: "LKR 700",
          icon: "📅",
        },
      ],
      area: "We deliver islandwide with special rates for Colombo, Galle, and Kandy areas.",
      followUp: "Would you like to check if we deliver to your area?",
    },
    payment: {
      response: "We accept the following payment methods:",
      options: [
        {
          method: "Credit/Debit Cards",
          types: "(Visa, Mastercard, Amex)",
          icon: "💳",
        },
        { method: "Mobile Pay", types: "(Genie, mCash, FriMi)", icon: "📱" },
        { method: "Cash on Delivery", types: "", icon: "💰" },
        { method: "Bank Transfer", types: "", icon: "🏦" },
      ],
      security:
        "All online payments are processed through secure, encrypted channels for your safety.",
      followUp: "Do you have any specific payment concerns?",
    },
    locations: {
      response: "Our main seafood market is located at:",
      address: "123 Marine Drive, Colombo 03, Sri Lanka",
      hours: "Open daily 7AM-9PM for pickups",
      map: "https://maps.google.com/?q=123+Marine+Drive+Colombo",
      followUp: "Would you like directions or our delivery area map?",
    },
    hours: {
      response: "Our operating hours:",
      delivery: "Delivery available daily from 8AM to 10PM",
      pickup: "Market open for pickups from 7AM to 9PM",
      holidays: "Open all holidays except Sinhala & Tamil New Year",
      followUp: "Are you looking for specific holiday hours?",
    },
    freshness: {
      response: "Our seafood quality guarantee:",
      details: [
        "All seafood sourced daily from Sri Lankan fishermen",
        "Delivered same day to ensure maximum freshness",
        "Never frozen - always fresh",
        "Sustainable fishing practices approved by Sri Lankan authorities",
      ],
      followUp: "Would you like to know about our sustainability practices?",
    },
    order: {
      response: "You can place an order through:",
      options: [
        { method: "Website", details: "www.freshmalu.lk/order", icon: "🌐" },
        { method: "Phone", details: "(011) 123-4567", icon: "📞" },
        { method: "WhatsApp", details: "+94 76 123 4567", icon: "💬" },
        { method: "Chat", details: "Right here with me!", icon: "🤖" },
      ],
      process:
        "After ordering, you'll receive a confirmation SMS with delivery tracking.",
      followUp: "Would you like to start an order now?",
    },
    specials: {
      response: "Today's Sri Lankan specials:",
      items: [
        {
          item: "Lobster Curry for Two",
          price: "LKR 6500 (regular LKR 8000)",
          includes:
            "Includes 2 live lobsters, Sri Lankan curry sauce, and rice",
        },
        {
          item: "Family Seafood Platter",
          price: "LKR 9500",
          includes:
            "Mix of prawns, scallops, fish fillets, and squid with local spices",
        },
        { item: "Oyster Happy Hour", price: "LKR 100 each (5-7PM only)" },
      ],
      followUp: "Shall I reserve any of these for you?",
    },
    recommendations: {
      response: "Based on Sri Lankan customer favorites, I recommend:",
      items: [
        {
          item: "Ambul Thiyal (Sour Fish Curry)",
          reason: "Our most authentic Sri Lankan dish - tangy and flavorful",
        },
        {
          item: "Garlic Butter Prawns",
          reason: "Jumbo prawns with Sri Lankan-grown garlic",
        },
        {
          item: "Grilled Seer Fish",
          reason: "Local favorite, seasoned with traditional spices",
        },
        {
          item: "Prawns in Clay Pot (Lamprais Style)",
          reason: "Succulent prawns baked with rice in banana leaf",
        },
        {
          item: "Jaffna Crab Curry",
          reason: "Fiery Northern-style curry with tender crab meat",
        },
      ],
      followUp: "Would you like pairing suggestions with these?",
    },
    account: {
      response: "Account management options:",
      options: [
        {
          icon: "👤",
          option: "Registration",
          details: "Sign up to track orders, save favorites, and get discounts",
        },
        {
          icon: "🔒",
          option: "Login",
          details: "Access your account to view order history and preferences",
        },
        {
          icon: "🔄",
          option: "Password Reset",
          details: "Reset your password if you've forgotten it",
        },
        {
          icon: "📧",
          option: "Update Profile",
          details: "Change your contact information and delivery addresses",
        },
      ],
      followUp: "Would you like help with any of these account features?",
    },
    tracking: {
      response: "Order tracking information:",
      details: [
        "All orders receive a tracking number via SMS/email",
        "Track your order in real-time on our website",
        "Delivery updates sent at key stages (preparation, dispatch, delivery)",
        "Contact support if your order is delayed beyond estimated time",
      ],
      followUp: "Do you need help tracking a specific order?",
    },
    returns: {
      response: "Our return and refund policy:",
      policy: [
        "Fresh seafood cannot be returned for quality reasons",
        "Packaged products may be returned within 3 days if unopened",
        "Wrong/damaged items will be replaced immediately",
        "Refunds processed within 5-7 business days to original payment method",
      ],
      followUp: "Do you have a specific return request?",
    },
    recipes: {
      response: "We provide free recipes with every order!",
      popular: [
        "Sri Lankan Fish Curry with Coconut Milk",
        "Devilled Prawns with Local Spices",
        "Grilled Lobster with Garlic Butter",
        "Traditional Ambul Thiyal (Sour Fish Curry)",
        "Crab Stir-fry with Sri Lankan Vegetables",
      ],
      followUp: "Would you like me to send you some recipe ideas?",
    },
    feedback: {
      response: "We value your feedback!",
      options: [
        {
          method: "Website",
          details: "Submit feedback through our contact form",
        },
        { method: "Email", details: "feedback@freshmalu.lk" },
        { method: "Phone", details: "(011) 123-4567 (ask for customer service)" },
        { method: "WhatsApp", details: "+94 76 123 4567" },
      ],
      followUp: "Would you like to share feedback now?",
    },
    ratings: {
      response: "Customer ratings and reviews:",
      details: [
        "⭐️⭐️⭐️⭐️⭐️ Average rating from 1500+ customers",
        "Read reviews on our website or Google reviews",
        "Recent customer praise for freshness and delivery speed",
        "We respond to all reviews within 24 hours",
      ],
      followUp: "Would you like to leave a rating for your recent order?",
    },
    schedules: {
      response: "Delivery schedule information:",
      details: [
        "Standard delivery: 8AM-10PM daily (4-6 hour window)",
        "Express delivery: 2-hour delivery within Colombo",
        "Scheduled delivery: Choose your preferred 2-hour window",
        "Early morning delivery available for orders placed by 10PM previous day",
      ],
      followUp: "Would you like to schedule a specific delivery time?",
    },
    contact: {
      response: "Contact options:",
      methods: [
        {
          icon: "📞",
          method: "Phone",
          details: "(011) 123-4567 (8AM-10PM daily)",
        },
        { icon: "💬", method: "WhatsApp", details: "+94 76 123 4567" },
        { icon: "📧", method: "Email", details: "info@freshmalu.lk" },
        {
          icon: "🏪",
          method: "In Person",
          details: "123 Marine Drive, Colombo 03 (7AM-9PM)",
        },
      ],
      followUp: "Which contact method would you prefer?",
    },
    promotions: {
      response: "Current promotions:",
      offers: [
        "🎉 15% off first order for new customers (code: WELCOME15)",
        "👪 Family Bundle: 20% off orders over LKR 15,000",
        "🎂 Birthday Month: Free dessert with order (show ID)",
        "📱 App Exclusive: 10% off when ordering through our mobile app",
      ],
      followUp: "Would you like to apply a promotion to your order?",
    },
    safety: {
      response: "Our COVID-19 safety measures:",
      measures: [
        "All staff fully vaccinated and temperature checked daily",
        "Contactless delivery option available",
        "Enhanced packaging sanitation procedures",
        "Masks and gloves worn by all delivery personnel",
      ],
      followUp: "Do you have any specific safety concerns?",
    },
    corporate: {
      response: "Corporate and bulk ordering:",
      options: [
        {
          icon: "🏢",
          option: "Corporate Accounts",
          details: "Special pricing for businesses ordering regularly",
        },
        {
          icon: "🎁",
          option: "Gift Hampers",
          details: "Custom seafood gift packages for clients/staff",
        },
        {
          icon: "🍽️",
          option: "Event Catering",
          details: "Full-service seafood catering for events",
        },
      ],
      followUp: "Would you like to speak with our corporate sales team?",
    },
    default: [
      "I'm not sure I understand. Could you ask about our menu, delivery options, or something else?",
      "Hmm, I didn't catch that. Could you rephrase or ask about our seafood offerings?",
      "I'm still learning! Could you ask about our menu, delivery, or payment options?",
    ],
  };

  // Comprehensive keyword mapping covering all aspects
  const keywordMap = {
    greetings: [
      "hi",
      "hello",
      "hey",
      "ayubowan",
      "good morning",
      "good afternoon",
      "greetings",
    ],
    menu: [
      "menu",
      "offer",
      "have",
      "sell",
      "selection",
      "items",
      "products",
      "seafood",
      "fish",
      "prawn",
      "lobster",
      "crab",
    ],
    delivery: [
      "deliver",
      "delivery",
      "ship",
      "time",
      "hours",
      "arrive",
      "when",
      "get here",
      "dispatch",
      "receive",
      "when will it come",
    ],
    payment: [
      "pay",
      "payment",
      "card",
      "cash",
      "credit",
      "debit",
      "money",
      "checkout",
      "how to pay",
      "payment options",
      "COD",
    ],
    locations: [
      "where",
      "location",
      "address",
      "find",
      "map",
      "directions",
      "colombo",
      "kandy",
      "galle",
      "pickup",
      "store",
      "physical",
    ],
    hours: [
      "hour",
      "open",
      "close",
      "time",
      "available",
      "operating",
      "when close",
      "when open",
    ],
    freshness: [
      "fresh",
      "quality",
      "source",
      "good",
      "catch",
      "sustainable",
      "sri lanka",
      "local",
      "fishermen",
      "how fresh",
      "when caught",
    ],
    order: [
      "order",
      "buy",
      "purchase",
      "get",
      "want",
      "checkout",
      "cart",
      "how to order",
      "place order",
    ],
    specials: [
      "special",
      "deal",
      "discount",
      "offer",
      "promo",
      "sale",
      "today's special",
      "promotion",
    ],
    recommendations: [
      "recommend",
      "suggest",
      "best",
      "favorite",
      "popular",
      "what should i get",
      "what's good",
      "what do you recommend",
    ],
    account: [
      "account",
      "login",
      "sign in",
      "register",
      "profile",
      "password",
      "forgot password",
      "my account",
    ],
    tracking: [
      "track",
      "tracking",
      "where is my order",
      "status",
      "when will it arrive",
      "order status",
      "delivery status",
    ],
    returns: [
      "return",
      "refund",
      "exchange",
      "wrong item",
      "damaged",
      "send back",
      "not satisfied",
    ],
    recipes: [
      "recipe",
      "cook",
      "how to prepare",
      "make",
      "cooking instructions",
      "how to cook",
    ],
    feedback: [
      "feedback",
      "review",
      "complain",
      "complaint",
      "suggestion",
      "not happy",
      "issue",
    ],
    ratings: ["rating", "rate", "stars", "how good", "reviews", "testimonials"],
    schedules: [
      "schedule",
      "time slot",
      "delivery time",
      "choose time",
      "specific time",
      "appointment",
    ],
    contact: [
      "contact",
      "call",
      "email",
      "phone",
      "number",
      "reach",
      "get in touch",
      "customer service",
    ],
    promotions: [
      "promo",
      "discount",
      "coupon",
      "voucher",
      "code",
      "special offer",
      "deal",
    ],
    safety: [
      "covid",
      "safe",
      "sanitize",
      "hygiene",
      "clean",
      "pandemic",
      "precautions",
    ],
    corporate: [
      "corporate",
      "business",
      "bulk",
      "wholesale",
      "catering",
      "event",
      "gift",
      "company",
    ],
  };

 
  // Handle user input
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSuggestions([]);
    setIsTyping(true);

    // Process after a short delay to simulate bot thinking
    setTimeout(() => {
      const botMessage = generateBotResponse(inputValue.toLowerCase());
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      // Scroll to bottom after bot response
      setTimeout(scrollToBottom, 100);
    }, 800 + Math.random() * 700); // Random delay between 800-1500ms
  };

  // Generate comprehensive bot responses
  const generateBotResponse = (userInput) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check for greetings
    if (keywordMap.greetings.some((word) => userInput.includes(word))) {
      const randomGreeting =
        botResponses.greetings[
          Math.floor(Math.random() * botResponses.greetings.length)
        ];
      return {
        text: randomGreeting,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Show me the menu",
          "Delivery options",
          "Today's specials",
          "Track my order",
        ],
      };
    }

    // Check for menu questions
    if (keywordMap.menu.some((word) => userInput.includes(word))) {
      const menuItems = botResponses.menu.options
        .map(
          (item) =>
            `${item.emoji} ${item.item} - ${item.price}${
              item.popular ? " ★" : ""
            }`
        )
        .join("\n");

      return {
        text: `${botResponses.menu.response}\n${menuItems}\n\n${botResponses.menu.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: ["Recommendations", "Today's specials", "Start an order"],
      };
    }

    // Check for delivery questions
    if (keywordMap.delivery.some((word) => userInput.includes(word))) {
      const deliveryOptions = botResponses.delivery.options
        .map((opt) => `${opt.icon} ${opt.type} (${opt.time}) - ${opt.price}`)
        .join("\n");

      return {
        text: `${botResponses.delivery.response}\n${deliveryOptions}\n\n${botResponses.delivery.area}\n\n${botResponses.delivery.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Check delivery area",
          "Express delivery",
          "Schedule for later",
        ],
      };
    }

    // Check for payment questions
    if (keywordMap.payment.some((word) => userInput.includes(word))) {
      const paymentOptions = botResponses.payment.options
        .map((pay) => `${pay.icon} ${pay.method} ${pay.types}`)
        .join("\n");

      return {
        text: `${botResponses.payment.response}\n${paymentOptions}\n\n${botResponses.payment.security}\n\n${botResponses.payment.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Is cash on delivery safe?",
          "Save my payment info?",
          "Payment security details",
        ],
      };
    }

    // Check for location questions
    if (keywordMap.locations.some((word) => userInput.includes(word))) {
      return {
        text: `${botResponses.locations.response}\n📍 ${botResponses.locations.address}\n\n${botResponses.locations.hours}\n\n${botResponses.locations.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: ["Show on map", "Delivery area", "Parking information"],
      };
    }

    // Check for hours questions
    if (keywordMap.hours.some((word) => userInput.includes(word))) {
      return {
        text: `${botResponses.hours.response}\n\n${botResponses.hours.delivery}\n${botResponses.hours.pickup}\n${botResponses.hours.holidays}\n\n${botResponses.hours.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "New Year hours",
          "Weekend hours",
          "Early morning delivery",
        ],
      };
    }

    // Check for freshness questions
    if (keywordMap.freshness.some((word) => userInput.includes(word))) {
      const freshnessDetails = botResponses.freshness.details
        .map((detail) => `✓ ${detail}`)
        .join("\n");

      return {
        text: `${botResponses.freshness.response}\n${freshnessDetails}\n\n${botResponses.freshness.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Sustainability practices",
          "Local fishermen",
          "Quality guarantee",
        ],
      };
    }

    // Check for order questions
    if (keywordMap.order.some((word) => userInput.includes(word))) {
      const orderOptions = botResponses.order.options
        .map((opt) => `${opt.icon} ${opt.method}: ${opt.details}`)
        .join("\n");

      return {
        text: `${botResponses.order.response}\n${orderOptions}\n\n${botResponses.order.process}\n\n${botResponses.order.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: ["Start an order", "Phone number again?", "Website link"],
      };
    }

    // Check for specials
    if (keywordMap.specials.some((word) => userInput.includes(word))) {
      const specialItems = botResponses.specials.items
        .map((item) => `🔥 ${item.item} - ${item.price}\n   ${item.includes}`)
        .join("\n\n");

      return {
        text: `${botResponses.specials.response}\n\n${specialItems}\n\n${botResponses.specials.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Reserve lobster curry",
          "Family platter details",
          "Oyster happy hour",
        ],
      };
    }

    // Check for recommendations
    if (keywordMap.recommendations.some((word) => userInput.includes(word))) {
      const recommendedItems = botResponses.recommendations.items
        .map((item) => `⭐ ${item.item}\n   ${item.reason}`)
        .join("\n\n");

      return {
        text: `${botResponses.recommendations.response}\n\n${recommendedItems}\n\n${botResponses.recommendations.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Pairing suggestions",
          "See full menu",
          "Start an order",
        ],
      };
    }

    // Check for account questions
    if (keywordMap.account.some((word) => userInput.includes(word))) {
      const accountOptions = botResponses.account.options
        .map((opt) => `${opt.icon} ${opt.option}: ${opt.details}`)
        .join("\n\n");

      return {
        text: `${botResponses.account.response}\n\n${accountOptions}\n\n${botResponses.account.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "How to register",
          "Forgot password",
          "Update profile",
        ],
      };
    }

    // Check for tracking questions
    if (keywordMap.tracking.some((word) => userInput.includes(word))) {
      const trackingDetails = botResponses.tracking.details
        .map((detail) => `• ${detail}`)
        .join("\n");

      return {
        text: `${botResponses.tracking.response}\n${trackingDetails}\n\n${botResponses.tracking.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Where is my order?",
          "No tracking number",
          "Delivery delayed",
        ],
      };
    }

    // Check for returns questions
    if (keywordMap.returns.some((word) => userInput.includes(word))) {
      const returnPolicy = botResponses.returns.policy
        .map((item) => `• ${item}`)
        .join("\n");

      return {
        text: `${botResponses.returns.response}\n${returnPolicy}\n\n${botResponses.returns.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Request return",
          "Damaged item",
          "Wrong item received",
        ],
      };
    }

    // Check for recipes questions
    if (keywordMap.recipes.some((word) => userInput.includes(word))) {
      const recipeList = botResponses.recipes.popular
        .map((recipe) => `• ${recipe}`)
        .join("\n");

      return {
        text: `${botResponses.recipes.response}\n\nPopular recipes:\n${recipeList}\n\n${botResponses.recipes.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Send fish curry recipe",
          "Prawn recipes",
          "Lobster cooking tips",
        ],
      };
    }

    // Check for feedback questions
    if (keywordMap.feedback.some((word) => userInput.includes(word))) {
      const feedbackOptions = botResponses.feedback.options
        .map((opt) => `• ${opt.method}: ${opt.details}`)
        .join("\n");

      return {
        text: `${botResponses.feedback.response}\n\nYou can provide feedback through:\n${feedbackOptions}\n\n${botResponses.feedback.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Submit complaint",
          "Make suggestion",
          "Contact customer service",
        ],
      };
    }

    // Check for ratings questions
    if (keywordMap.ratings.some((word) => userInput.includes(word))) {
      const ratingDetails = botResponses.ratings.details
        .map((detail) => `• ${detail}`)
        .join("\n");

      return {
        text: `${botResponses.ratings.response}\n${ratingDetails}\n\n${botResponses.ratings.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Leave 5-star review",
          "Read customer reviews",
          "Recent feedback",
        ],
      };
    }

    // Check for schedules questions
    if (keywordMap.schedules.some((word) => userInput.includes(word))) {
      const scheduleDetails = botResponses.schedules.details
        .map((detail) => `• ${detail}`)
        .join("\n");

      return {
        text: `${botResponses.schedules.response}\n${scheduleDetails}\n\n${botResponses.schedules.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Schedule tomorrow delivery",
          "Early morning options",
          "Weekend delivery",
        ],
      };
    }

    // Check for contact questions
    if (keywordMap.contact.some((word) => userInput.includes(word))) {
      const contactMethods = botResponses.contact.methods
        .map((method) => `${method.icon} ${method.method}: ${method.details}`)
        .join("\n\n");

      return {
        text: `${botResponses.contact.response}\n\n${contactMethods}\n\n${botResponses.contact.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Call customer service",
          "WhatsApp support",
          "Email address",
        ],
      };
    }

    // Check for promotions questions
    if (keywordMap.promotions.some((word) => userInput.includes(word))) {
      const promotionList = botResponses.promotions.offers
        .map((offer) => `• ${offer}`)
        .join("\n");

      return {
        text: `${botResponses.promotions.response}\n\n${promotionList}\n\n${botResponses.promotions.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Apply WELCOME15",
          "Family bundle details",
          "App download link",
        ],
      };
    }

    // Check for safety questions
    if (keywordMap.safety.some((word) => userInput.includes(word))) {
      const safetyMeasures = botResponses.safety.measures
        .map((measure) => `✓ ${measure}`)
        .join("\n");

      return {
        text: `${botResponses.safety.response}\n${safetyMeasures}\n\n${botResponses.safety.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Contactless delivery",
          "Staff health checks",
          "Packaging safety",
        ],
      };
    }

    // Check for corporate questions
    if (keywordMap.corporate.some((word) => userInput.includes(word))) {
      const corporateOptions = botResponses.corporate.options
        .map((opt) => `${opt.icon} ${opt.option}: ${opt.details}`)
        .join("\n\n");

      return {
        text: `${botResponses.corporate.response}\n\n${corporateOptions}\n\n${botResponses.corporate.followUp}`,
        sender: "bot",
        timestamp,
        avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        quickReplies: [
          "Corporate pricing",
          "Event catering",
          "Gift hampers",
        ],
      };
    }

    // Default response
    const randomDefault =
      botResponses.default[
        Math.floor(Math.random() * botResponses.default.length)
      ];
    return {
      text: randomDefault,
      sender: "bot",
      timestamp,
      avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
      quickReplies: ["Menu", "Delivery", "Payment", "Contact"],
    };
  };

  // Handle quick replies
  const handleQuickReply = (question) => {
    setInputValue(question);
    inputRef.current.focus();

    // Auto-send after a short delay if the input is already focused
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSendMessage(fakeEvent);
    }, 300);
  };

  // Handle input change with suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const suggestions = generateSuggestions(value.toLowerCase());
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Generate suggestions based on input
  const generateSuggestions = (input) => {
    const commonQuestions = [
      "What's on the menu?",
      "What are your delivery options?",
      "How do I pay for my order?",
      "Where are you located?",
      "What are your hours?",
      "How fresh is your seafood?",
      "How do I place an order?",
      "What are today's specials?",
      "What do you recommend?",
      "How do I track my order?",
      "What's your return policy?",
      "Do you have any recipes?",
      "How do I contact customer service?",
      "Are there any current promotions?",
      "What safety measures are you taking?",
      "How do I create an account?",
      "Do you offer corporate catering?",
      "Can I schedule a delivery time?",
      "How do I leave feedback?",
      "Where can I see customer ratings?",
    ];

    return commonQuestions
      .filter((question) => question.toLowerCase().includes(input))
      .slice(0, 3);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
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
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        {/* Title with decorative elements */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
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
            </h2>
            <p className="text-muted-foreground mt-1">
              Get instant help with your seafood orders and deliveries
            </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10">
            <GiSushis className="text-9xl text-blue-500" />
          </div>
        </div>

        {/* Chatbot Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    alt="Chatbot Avatar"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold">FRESHMALU.LK Assistant</h3>
                <p className="text-xs opacity-80">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div 
            className="h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white"
            ref={chatContainerRef}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } items-start gap-2`}
                >
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                          alt="Bot Avatar"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 relative ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                    }`}
                  >
                    {message.text.split("\n").map((line, i) => (
                      <p key={i} className="mb-1 last:mb-0">
                        {line}
                      </p>
                    ))}
                    <div
                      className={`text-xs mt-1 text-right ${
                        message.sender === "user"
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </div>
                    {message.sender === "bot" && message.quickReplies && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-full transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          alt="User Avatar"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                        alt="Bot Avatar"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-3 rounded-bl-none shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(suggestion);
                      setSuggestions([]);
                      inputRef.current.focus();
                    }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ref={inputRef}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-r-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <FiSend className="h-5 w-5" />
              </button>
            </form>

            {/* Quick Reply Suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleQuickReply("What's on the menu?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <BiFoodMenu size={12} /> Menu
              </button>
              <button
                onClick={() => handleQuickReply("Delivery options?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <FaShippingFast size={12} /> Delivery
              </button>
              <button
                onClick={() => handleQuickReply("Payment methods?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <MdPayment size={12} /> Payment
              </button>
              <button
                onClick={() => handleQuickReply("Where are you located?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <FaMapMarkerAlt size={12} /> Location
              </button>
              <button
                onClick={() => handleQuickReply("What are today's specials?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <MdOutlineLocalOffer size={12} /> Specials
              </button>
              <button
                onClick={() => handleQuickReply("How fresh is your seafood?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <FaLeaf size={12} /> Freshness
              </button>
              <button
                onClick={() => handleQuickReply("How do I track my order?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <BiTime size={12} /> Tracking
              </button>
              <button
                onClick={() => handleQuickReply("What's your return policy?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <FaQuestionCircle size={12} /> Returns
              </button>
              <button
                onClick={() => handleQuickReply("How do I contact support?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <FaPhone size={12} /> Contact
              </button>
              <button
                onClick={() => handleQuickReply("How do I create an account?")}
                className="flex items-center gap-1 bg-white border border-blue-600 text-blue-600 rounded-full px-3 py-1 text-xs cursor-pointer transition-all hover:bg-blue-600 hover:text-white"
              >
                <RiAccountCircleFill size={12} /> Account
              </button>
            </div>
          </div>
        </div>
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
};

export default Chatbot;