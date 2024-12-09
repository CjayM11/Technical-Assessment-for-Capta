import React, { useState } from "react";
import NavbarMenu from '../components/navbar';

const DashboardPage = () => {
  // State to track the active menu item
  const [activeMenuItem, setActiveMenuItem] = useState('settings');
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <div>
      <NavbarMenu />

      <div className="flex w-screen">
        <div className="w-1/2">
          <div className="flex p-6">
            <div className="p-6 rounded-lg shadow-md bg-base-200 w-full">
              <div>
                <h1>Orders</h1>
                <div className="container">
                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 2 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          Carroll Group
          <br />
          <span className="badge badge-ghost badge-sm">Tax Accountant</span>
        </td>
        <td>Red</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 3 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Marjy Ferencz</div>
              <div className="text-sm opacity-50">Russia</div>
            </div>
          </div>
        </td>
        <td>
          Rowe-Schoen
          <br />
          <span className="badge badge-ghost badge-sm">Office Assistant I</span>
        </td>
        <td>Crimson</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      {/* row 4 */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Yancy Tear</div>
              <div className="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </td>
        <td>
          Wyman-Ledner
          <br />
          <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
        </td>
        <td>Indigo</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
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
                  {/* Conditional rendering based on active menu item */}
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
