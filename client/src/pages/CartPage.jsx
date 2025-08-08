import React, { useEffect, useState } from 'react';
import api from '../api';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const { data } = await api.get(`/cart/${userId}`);
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const checkout = async () => {
    if (!userId) return;
    try {
      const { data } = await api.post('/checkout', { userId });
      alert('Checkout complete!');
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!userId) {
    return <p className="text-center py-10">No user found. (In demo)</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="text-right text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <div className="text-right">
            <button
              onClick={checkout}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;