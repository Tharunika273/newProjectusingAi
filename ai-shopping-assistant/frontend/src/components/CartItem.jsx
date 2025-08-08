import React from 'react';

export default function CartItem({ item }) {
  if (!item.product) return null;
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded shadow p-3">
      <img src={item.product.image} alt={item.product.name} className="h-16 w-16 object-cover rounded mr-4" />
      <div className="flex-1">
        <div className="font-semibold text-gray-900 dark:text-gray-100">{item.product.name}</div>
        <div className="text-gray-500 dark:text-gray-300">${item.product.price} x {item.quantity}</div>
      </div>
      <div className="font-bold text-blue-600 dark:text-blue-300">${(item.product.price * item.quantity).toFixed(2)}</div>
    </div>
  );
}