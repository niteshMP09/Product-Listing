import Button from "../common/Button/Button";

interface ProductErrorStateProps {
  error: unknown;
  onRetry: () => void;
}

function ProductErrorState({ error, onRetry }: ProductErrorStateProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "Unable to load products. Please try again.";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-360 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <span aria-hidden="true" className="text-2xl">
          !
        </span>
      </div>

      <h1 className="mt-5 text-2xl font-semibold">Something went wrong</h1>

      <p className="mt-2 max-w-md text-sm text-gray-500">{errorMessage}</p>

      <Button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </Button>
    </main>
  );
}

export default ProductErrorState;
