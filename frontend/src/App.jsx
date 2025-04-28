import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import HomePage from './pages/HomePage'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'

import { Layout } from "./components/layout/layout";
import { Dashboard } from "./pages/dashboard";
import { Companies } from "./pages/companies"; 
import { Suppliers } from "./pages/suppliers"; 
import { Stocks } from "./pages/stocks"; 
import Login from "./pages/login";
import { Vehicles } from "./pages/vehicles";
import { Deliveries } from "./pages/deliveries";
import { Warehouses } from "./pages/warehouses";
import { Orders } from "./pages/orders";
import SignUp from "./pages/signup";
import { Schedules } from "./pages/schedules";
import { Feedbacks } from "./pages/feedbacks";
import { Ratings } from "./pages/retings";
import { SeafoodItems } from "./pages/seafooditems";
import Chatbot from "./components/Chatbot";
import WelcomePage from "./pages/WelcomePage";

// Mock authentication function (Replace this with actual authentication logic)
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") !== null; // Example: Check if token exists
};

// PrivateRoute component to protect routes
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signup" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/seafooditems" element={<SeafoodItems />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/ratings" element={<Ratings />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/suppliers" element={<Suppliers />} /> 
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/warehouses" element={<Warehouses />} />   
            <Route path="/orders" element={<Orders />} /> 
            <Route path="/schedules" element={<Schedules />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;