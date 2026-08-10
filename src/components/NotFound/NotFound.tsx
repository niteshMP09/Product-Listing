import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-360 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-7xl font-bold tracking-tight text-gray-900">
        404
      </p>

      <h1 className="mt-4 text-2xl font-semibold text-gray-900">
        Page not found
      </h1>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        Sorry, the page you're looking for doesn't
        exist or may have been moved.
      </p>

      <Button
        type="button"
        onClick={() => navigate("/")}
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Back to products
      </Button>
    </main>
  );
}

export default NotFound;