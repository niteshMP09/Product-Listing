import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import Header from "../Header";
import Skeleton from "../common/Skeleton";
import ProductDetails from "./ProductDetails";

function ProductDetailPage() {
  const { productId } = useParams<{
    productId: string;
  }>();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(productId ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Skeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-semibold">Product not found</h1>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            {error instanceof Error
              ? error.message
              : "This product is not available."}
          </p>

          <Link
            to="/"
            className="mt-6 text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            Back to products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductDetailPage;
