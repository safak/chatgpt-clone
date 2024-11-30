// Import the scrollbar plugin
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Extend the theme for custom scrollbar colors
      colors: {
        'scrollbar-thumb': '#888', // Default scrollbar thumb color
        'scrollbar-thumb-hover': '#555', // Hover scrollbar thumb color
      },
    },
  },
  plugins: [
    // Custom scrollbar plugin
    plugin(function ({ addUtilities, theme, e }) {
      const scrollbarWidth = theme('spacing.2'); // default width (can be changed)
      const scrollbarThumb = theme('colors.scrollbar-thumb'); // default thumb color
      const scrollbarThumbHover = theme('colors.scrollbar-thumb-hover'); // thumb hover color
      
      addUtilities({
        '.scrollbar': {
          'scrollbar-width': 'thin', // Make scrollbar thin
          'scrollbar-color': `${scrollbarThumb} ${scrollbarThumbHover}`, // Set the thumb color and track color
        },
        '.scrollbar-track': {
          'background': '#f0f0f0', // Set the track color (light gray)
        },
        '.scrollbar-thumb': {
          'background-color': scrollbarThumb, // Set the thumb color
        },
        '.scrollbar-thumb:hover': {
          'background-color': scrollbarThumbHover, // Set thumb hover color
        },
      });
    }),
  ],
};
