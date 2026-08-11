import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPages/LoginPage/LoginPage";
import ForgotPasswordPage from "./LoginPages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./LoginPages/ResetPasswordPage/ResetPasswordPage";
import Layout from "./components/Layout/Layout";
import DashBoard from "./dashboardPages/dashBoardPage/DashBoard";
import OrdersPage from "./dashboardPages/OrdersPage/OrdersPage";
import ProductsPage from "./dashboardPages/productsPage/ProductsPage";
import OtherPage from "./dashboardPages/otherPage/OtherPage";
import MarketLayout from "./MarketComponents/MarketLayout/MarketLayout";
import HomePage from "./MarketPages/HomePage/HomePage";
import CatalogPage from "./MarketPages/CatalogPage/CatalogPage";
import RegisterPage from "./MarketPages/RegisterPage/RegisterPage";
import ContactPage from "./MarketPages/ContactPage/ContactPage";
import AboutPage from "./MarketPages/AboutPage/AboutPage";
import WishlistPage from "./MarketPages/WishlistPage/WishlistPage";
import CartPage from "./MarketPages/CartPage/CartPage";
import AccountPage from "./MarketPages/AccountPage/AccountPage";
import CreateAccountPage from "./MarketPages/CreateAccountPage/CreateAccountPage";
import NewLoginPage from "./MarketPages/NewLoginPage/NewLoginPage";
import ProductDetailsPage from "./MarketPages/ProductDetailsPage/ProductDetailsPage";
import CheckoutPage from "./MarketPages/CheckoutPage/CheckoutPage";
import ProductFormPage from "./dashboardPages/productsPage/ProductFormPage/ProductFormPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashBoard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/edit/:id" element={<ProductFormPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="other" element={<OtherPage />} />
      </Route>
      <Route path="/" element={<MarketLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<CatalogPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="create-account" element={<CreateAccountPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="NewLoginPage" element={<NewLoginPage />}></Route>
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
