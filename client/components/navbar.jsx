import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'
import { getCart } from '../src/services.js/addToCartService';

const NavbarMenu = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);

            navigate('/');
        }
    }, [navigate]);


    useEffect(() => {
        const fetchCart = async () => {
            if (user?.userId) {
                console.log('User object:', user); // Check if user is properly set
                console.log('User ID:', user.userId);  // Check if user.id is available
    
                const response = await getCart(user.userId);
    
                if (response.success) {
                    setCartItems(response.cart);
                } else {
                    setErrorMessage(response.message);
                }
            } else {
                console.log('User ID is not available or user is null');
            }
        };
    
        fetchCart();
    }, [user]);
    

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    };
    if (!isAuthenticated) {
        return null; // Return null or a message indicating that the user is not authorized
    }
    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full fixed top-0 ">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="navbar-start">
                            <div className="mx-2 flex-1 px-2">Welcome userName</div>
                        </div>
                        <div className="navbar-center">
                            <ul className="menu menu-horizontal w-full">
                                <li><Link to="/dashboard">Home</Link></li>
                                <li><Link to="/shop">Products</Link></li>
                                <li><a>Community</a></li>
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-base-100 z-40 mt-3 w-fit shadow">
                                    <div className="card-body">
                                        {cartItems.length === 0 ? (
                                            <p>Your cart is empty</p>
                                        ) : (
                                            <>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map((item) => (
                                                            <tr key={item._id}>
                                                                <td>{item.productId.name}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-error btn-sm"
                                                                        onClick={() => handleRemoveFromCart(item._id)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <span className="text-info">Subtotal: ${calculateSubtotal()}</span>
                                                <div className="card-actions">
                                                    <button className="btn btn-primary btn-block">View cart</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Page content here */}

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavbarMenu;
