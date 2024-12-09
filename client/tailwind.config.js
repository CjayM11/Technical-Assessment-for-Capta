/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../components/**/*.{html,js,jsx}'",
    "./components/**/*.{html,js,jsx}'",
    "./index.html",
    "../pages/dashboard",
    "./pages/dashboard"
  ],
  theme: {},
  plugins: [daisyui],
}
