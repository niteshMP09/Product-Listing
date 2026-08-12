function ProductBenefits() {
  return (
    <div className="mt-8 rounded-xl bg-gray-50 p-5">
      <div className="space-y-4">
        <div className="flex gap-3">
          <span
            aria-hidden="true"
            className="text-lg"
          >
            ✓
          </span>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Secure checkout
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Safe and secure payment
              processing.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <span
            aria-hidden="true"
            className="text-lg"
          >
            ↻
          </span>

          <div>
            <p className="text-sm font-medium text-gray-900">
              Easy returns
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Hassle-free returns on
              eligible products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBenefits;