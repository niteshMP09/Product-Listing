import { Route, Routes } from "react-router-dom";

import { NotFound } from "../components";

import ProductListingPage, { ProductDetailsPage } from "../pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListingPage />} />

      <Route path="/products/:productId" element={<ProductDetailsPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
