import { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this with your actual endpoint (MockAPI, Express, etc.)
    axios.get('https://yourapi.com/cart')
      .then(response => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
        setLoading(false);
      });
  }, []);

  const handleRemove = (itemId) => {
    axios.delete(`https://yourapi.com/cart/${itemId}`)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
      })
      .catch(error => console.error('Error removing item:', error));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <div className="p-6 text-center">Loading cart...</div>;

  return (
    <div className="p-6 pt-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border p-4 rounded shadow-sm bg-white">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-semibold text-xl">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
