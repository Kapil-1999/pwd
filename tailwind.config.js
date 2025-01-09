/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
              'primary-blue': {
                800: '#1E40AF', // Example: A darker blue shade
                700: '#2563EB', // Example: A slightly lighter shade
              },
            },
          }
    },
    plugins: [],
  }