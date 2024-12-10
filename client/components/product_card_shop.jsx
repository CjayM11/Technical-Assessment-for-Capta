import React, { useEffect, useState } from 'react';
import { addToCart } from '../src/services.js/addToCartService'
import { useAuth, useCart } from '../context/authContext';
const shopProductCard = ({ image, name, description, price, productId, originalPrice, discount }) => {

  const [imgSrc, setImgSrc] = useState(image);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const { updateCart } = useCart();

  const handleError = () => {
    // Placeholder image 
    setImgSrc("https://via.placeholder.com/300");
  };

  //expend see more on descripton 
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };


  // add to cart TODO: update state on add to cart
  const handleAddToCart = async () => {
    if (!user) {
      console.log("Please log in to add products to the cart.");
      return;
    }
    const userId = user.userId;

    console.log("productId:", productId);
    console.log("userId:", userId);

    const response = await addToCart(userId, productId, 1);
    console.log('API Response:', response);
    if (response.success) {
      setMessage('Added to cart!');
      updateCart({ productId, name, price, quantity: 1 });
    } else {
      setMessage('Failed to add to cart.');
    }
  };


  return (
    <div className="max-w-sm mx-auto transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <a href="#">
        <img className="rounded-t-lg p-1 w-full h-40 object-cover" src={imgSrc} alt={name} onError={handleError} />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{name}</h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <p>
            {isExpanded
              ? description
              : `${description.length > 65 ? description.substring(0, 65) + "..." : description}`}
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={toggleDescription}
            >
              {isExpanded ? " See Less" : " See More"}
            </a>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">R{price} </span>
          <a onClick={handleAddToCart} href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
            to cart</a>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>

  );
}

export default shopProductCard;
