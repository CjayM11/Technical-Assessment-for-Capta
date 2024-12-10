import React, { useState } from "react";
import '../src/index.css'
const DashboardPage = () => {

  const [activeMenuItem, setActiveMenuItem] = useState('settings');
  const [selectedOption, setSelectedOption] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchPendingOrders = async () => {
  //     try {
  //       const response = await getOrders(); 
  //       if (response.success) {
  //         setOrders(response.data); // Assuming your API response contains data in `response.data`
  //       } else {
  //         setError(response.message || 'Failed to fetch orders');
  //       }
  //     } catch (err) {
  //       setError('An error occurred while fetching orders');
  //       console.error(err);
  //     }
  //   };

  //   fetchPendingOrders();
  // }, []);

  return (
    <div>
      <div className="flex w-screen">
        <div className="w-1/2">
          <div className="flex p-6">
            <div className="p-6 rounded-lg shadow-md bg-base-200 w-full">
              <div>
                <div className="container">
                  <h1>Current Orders</h1>
                  <div className="overflow-x-auto">
                    {/* <div>
                      {error && <p className="text-red-500">{error}</p>}
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Order Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.length > 0 ? (
                            orders.map((order) => (
                              <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.productName}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No pending orders found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div> */}
                  </div>

                </div>
                <div className="container">
                  <h3>Order history</h3>
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Order Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex p-6">
            <div className="p-6 rounded-lg shadow-md bg-base-200 w-full">
              <div className="w-full">
                <h1>Profile</h1>
              </div>
              <div className="flex w-full">
                <div className="flex">
                  <ul className="menu">
                    {/* Menu Item 1 - Settings */}
                    <li onClick={() => setActiveMenuItem('settings')}>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <span>Settings</span>
                      </a>
                    </li>

                    {/* Menu Item 2 - Active Orders */}
                    <li
                      onClick={() => setActiveMenuItem('activeOrders')}
                    >
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Billing</span>
                      </a>
                    </li>
                    <li
                      onClick={() => setActiveMenuItem('Support')}
                    >
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Support</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  {/* content */}
                  {activeMenuItem === 'settings' && (
                    <div>
                      <h2 className="text-2xl font-bold">Settings</h2>
                      <div className="container flex flex-wrap">
                        <div className="form-control p-2">
                          <label className="label">
                            <span className="label-text">Name:</span>
                          </label>
                          <input
                            type="text"
                            placeholder="name"
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control p-2">
                          <label className="label">
                            <span className="label-text">Email:</span>
                          </label>
                          <input
                            type="text"
                            placeholder="email"
                            className="input input-bordered"
                          />
                        </div>
                      </div>
                      <div className="divider lg:divider">Address</div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Street Address</span>
                        </label>
                        <input
                          type="text"
                          placeholder="street adress"
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Suburb or city/town:</span>
                        </label>
                        <input
                          type="text"
                          placeholder="suburb or city/town"
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Postal code:</span>
                        </label>
                        <input
                          type="text"
                          placeholder="postal code"
                          className="input input-bordered"
                        />
                      </div>
                      <div className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Province :</span>
                        </div>
                        <select
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="select-class input input-bordered"
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          <option value="Eastern Cape">Eastern Cape</option>
                          <option value="Free State">Free State</option>
                          <option value="Gauteng">Gauteng</option>
                          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                          <option value="Limpopo">Limpopo</option>
                          <option value="Mpumalanga">Mpumalanga</option>
                          <option value="Mpumalanga">Mpumalanga</option>
                          <option value="Northern Cape">Northern Cape</option>
                          <option value="North West">North West </option>
                          <option value="Western Cape">Western Cape</option>
                        </select>
                      </div>

                      <div className="container flex justify-center p-2">
                        <div className="p-2"><button className="custom-black-btn-border">Save Changes</button></div>
                        <div className="p-2"><button className="custom-red-btn">Delete Account</button></div>
                      </div>

                    </div>
                  )}
                  {activeMenuItem === 'activeOrders' && (
                    <div>
                      <h2 className="text-2xl font-bold">Active Orders</h2>
                      <p>Here are your active orders.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
