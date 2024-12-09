import React from "react";
import Slider from "react-slick"; // Import react-slick for the carousel
import ProductCard from './product_card'; // Import your ProductCard component

const ProductCarousel = () => {
  // Product data (replace with actual dynamic data if needed)
  const products = [
    {
      id: 1,
      image: "../src/assets/book1.jpg",
      name: "Product 1",
      description: "Product 1 description.",
      price: "20.00",
      originalPrice: "25.00",
      discount: "20",
    },
    {
      id: 2,
      image: "../src/assets/book2.jpg",
      name: "Product 2",
      description: "Product 2 description.",
      price: "15.00",
      originalPrice: "18.00",
      discount: "10",
    },
    {
      id: 3,
      image: "../src/assets/book2.jpg",
      name: "Product 3",
      description: "Product 3 description.",
      price: "30.00",
      originalPrice: "35.00",
      discount: "15",
    },
    {
      id: 4,
      image: "../src/assets/book1.jpg",
      name: "Product 3",
      description: "Product 3 description.",
      price: "30.00",
      originalPrice: "35.00",
      discount: "15",
    },
    {
      id: 5,
      image: "../src/assets/book2.jpg",
      name: "Product 3",
      description: "Product 3 description.",
      price: "30.00",
      originalPrice: "35.00",
      discount: "15",
    },
    {
      id: 6,
      image: "../src/assets/book3.jpg",
      name: "Product 3",
      description: "Product 3 description.",
      price: "30.00",
      originalPrice: "35.00",
      discount: "15",
    },
    // Add more products as needed
  ];

  const settings = {
    infinite: true,   // Loop the carousel infinitely
    autoplay: true,   // Auto play
    autoplaySpeed: 1,  // Delay between slides in ms (set to 1 for immediate transition)
    slidesToShow: 3,  // Number of slides to show at once
    slidesToScroll: 1,  // Number of slides to scroll at once
    speed: 9000,  // Speed of transition (lower value = faster)
    cssEase: "linear", // Smooth, continuous transition without pauses
    pauseOnHover: false, // Disables pause when hovering
    centerMode: false,  // Keep all slides moving consistently
  };

  return (
    <div className="w-full g-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-lg py-6 h-64 mt-8 fixed bottom-5 z-10 shadow-lg overflow-hidden">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-4"> {/* Adds horizontal padding between each product */}
            <ProductCard
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
