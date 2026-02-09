// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // For App Router
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007ACE', // Example custom color
      },
      // You can extend other theme properties like spacing, fonts, etc.
    },
  },
  plugins: [],
};
