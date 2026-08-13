import Button from "../common/Button/Button";

interface ErrorFallbackProps {
  onRetry: () => void;
}

function ErrorFallback({ onRetry }: ErrorFallbackProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-360 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <span aria-hidden="true" className="text-2xl">
          !
        </span>
      </div>

      <h1 className="mt-5 text-2xl font-semibold text-gray-900">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        We couldn't load this page correctly. Please try again.
      </p>

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

export default ErrorFallback;
