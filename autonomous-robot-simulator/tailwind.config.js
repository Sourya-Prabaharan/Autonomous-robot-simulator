/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#ededed",
                primary: {
                    DEFAULT: "#3b82f6",
                    dark: "#1d4ed8",
                },
                secondary: "#1f2937",
                accent: "#10b981",
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
