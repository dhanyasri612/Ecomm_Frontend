import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center gap-4 mb-4 border-b pb-4">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">
          Seller: {item.seller || "Shop-Mart"}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button onClick={onDecrease} className="px-3 py-2 hover:bg-gray-50">
              -
            </button>
            <div className="px-4 font-semibold">{item.quantity}</div>
            <button onClick={onIncrease} className="px-3 py-2 hover:bg-gray-50">
              +
            </button>
          </div>
          <div className="text-lg font-bold text-amber-600">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
