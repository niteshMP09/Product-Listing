import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary, NotFound } from "./components";
import ProductListingPage, { ProductDetailsPage } from "./pages";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
