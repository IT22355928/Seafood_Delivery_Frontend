import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const seafoodItems = [
    {
      name: "Fresh Atlantic Salmon",
      description: "Wild-caught, sustainably sourced",
      price: "$24.99/lb",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Jumbo Shrimp",
      description: "Peeled and deveined, ready to cook",
      price: "$18.99/lb",
      image:
        "https://images.unsplash.com/photo-1605209671121-29ccf3e25f7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      name: "Bluefin Tuna Steaks",
      description: "Sashimi-grade, ultra fresh",
      price: "$29.99/lb",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % seafoodItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [seafoodItems.length]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "py-4 bg-ocean-blue shadow-md" : "py-6 bg-ocean-blue/90"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">FreshMalu.lk</div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-white hover:text-gold-accent transition-colors bg-transparent border border-white hover:bg-white/10 px-4 py-2 rounded-full"
            >
              Sign In
            </button>
          </div>
          <button className="md:hidden text-white text-2xl">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${seafoodItems[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Fresh Seafood <br /> Delivered to Your Door
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-lg">
            Enjoy the ocean's bounty with our premium, sustainably sourced
            seafood
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section - With Online Images */}
      <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-black bg-ocean-blue rounded-full mb-4 shadow-md">
              🦀 Fresh Daily Catch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-ocean-blue mb-4">
              Today's FreshMalu.lk{" "}
              <span className="text-seafood-red">Selection</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Premium seafood delivered within 24 hours of catch
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Salmon Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://i.guim.co.uk/img/media/50a04370ec548b9909a1c925d3a5966aa5c142ac/3_0_2356_1414/master/2356.jpg?width=1200&quality=85&auto=format&fit=max&s=ceae54fc3820d173ee6fb9f0d3d26c09"
                  alt="Fresh Salmon"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  BESTSELLER
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Atlantic Salmon Fillet
                </h3>
                <p className="text-gray-600 mb-4">
                  Wild-caught, sustainably harvested
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-seafood-red">
                    Rs 1200/Kg
                  </span>
                  <button className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-4 py-2 rounded-lg transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Shrimp Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://freshkingdom.in/cdn/shop/files/tigerprawnsproduct_fd648749-bdcb-4268-8af2-f04e823a350e.png?v=1700821268"
                  alt="Jumbo Shrimp"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  DEAL OF THE DAY
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Jumbo Tiger Shrimp
                </h3>
                <p className="text-gray-600 mb-4">
                  Peeled, deveined, ready to cook
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-seafood-red">
                      Rs 1500/Kg
                    </span>
                    <span className="text-sm line-through text-gray-400 ml-2">
                      Rs 2400/Kg
                    </span>
                  </div>
                  <button className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-4 py-2 rounded-lg transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Tuna Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/60a688f897a1d73dda8f5dd3/1671202583426-7NZOB5IMK4DQHBT2QWI5/3322308428.jpg?format=1500w"
                  alt="Tuna Steaks"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                  PREMIUM
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bluefin Tuna Steaks
                </h3>
                <p className="text-gray-600 mb-4">Sashimi-grade, ultra fresh</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-seafood-red">
                    Rs 1200/Kg
                  </span>
                  <button className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-4 py-2 rounded-lg transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="mt-12 text-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-teal-200">
              View All Seafood Options
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section - Professional Color Scheme */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full mb-4">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">FreshMalu.lk</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Excellence in every catch - from ocean to your doorstep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-blue-100">
              <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Guaranteed Freshness
              </h3>
              <p className="text-gray-600">
                Next-day delivery on all Colombo orders placed before 2pm
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-blue-100">
              <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Direct from Sri Lanka's best fishing communities
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md text-center transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-blue-100">
              <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Expert Packaging
              </h3>
              <p className="text-gray-600">
                Professionally vacuum-sealed to lock in freshness
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg">
              Discover Our Quality Promise
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
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
                    to="#"
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
                    to="#"
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
                    to="#"
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
                    to="#"
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
                    to="#"
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
                    to="#"
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

export default WelcomePage;
