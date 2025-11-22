/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontFamily: {
                'google': ['Google Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            colors: {
                google: {
                    blue: {
                        50: '#e8f0fe',
                        100: '#d2e3fc',
                        200: '#aecbfa',
                        300: '#8ab4f8',
                        400: '#669df6',
                        500: '#4285f4',
                        600: '#1a73e8',
                        700: '#1557b0',
                        800: '#0f4c81',
                        900: '#0a3d62',
                    },
                    gray: {
                        50: '#f8f9fa',
                        100: '#f1f3f4',
                        200: '#e8eaed',
                        300: '#dadce0',
                        400: '#bdc1c6',
                        500: '#9aa0a6',
                        600: '#80868b',
                        700: '#5f6368',
                        800: '#3c4043',
                        900: '#202124',
                    },
                    green: {
                        50: '#e6f4ea',
                        500: '#34a853',
                        600: '#137333',
                    },
                    red: {
                        50: '#fce8e6',
                        500: '#ea4335',
                        600: '#d33b2c',
                    },
                    yellow: {
                        50: '#fef7e0',
                        500: '#fbbc04',
                    },
                },
            },
            boxShadow: {
                'google': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
                'google-lg': '0 2px 10px 0 rgba(60, 64, 67, 0.3), 0 1px 4px 0 rgba(60, 64, 67, 0.15)',
                'google-hover': '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}