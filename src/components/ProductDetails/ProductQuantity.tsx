interface ProductQuantityProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

function ProductQuantity({ quantity, onQuantityChange }: ProductQuantityProps) {
  return (
    <div>
      <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
        Quantity
      </label>

      <div className="mt-3 flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={quantity === 1}
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <span
          id="quantity"
          className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-sm font-medium"
        >
          {quantity}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onQuantityChange(quantity + 1)}
          className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductQuantity;
