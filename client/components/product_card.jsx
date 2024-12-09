import React from "react";

const ProductCard = ({ image, name, description, price, originalPrice, discount }) => {
    return (
        <div className="mx-auto w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex">
                <img className="w-48 h-48 object-cover object-center rounded-l-lg" src={image} alt={name} />
                <div className="p-4 flex-1">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{name}</h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{description}</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${price}</p>
                        <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">${originalPrice}</p>
                        <p className="ml-auto text-base font-medium text-green-500">{discount}% off</p>
                    </div>
                </div>
            </div>
        </div>
      
    );
}

export default ProductCard;
