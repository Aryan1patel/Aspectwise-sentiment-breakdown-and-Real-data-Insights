import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "hsl(250, 85%, 60%)",
                    dark: "hsl(250, 85%, 45%)",
                    light: "hsl(250, 85%, 75%)",
                },
                secondary: "hsl(280, 80%, 65%)",
                accent: "hsl(190, 85%, 55%)",
                success: "hsl(145, 70%, 55%)",
                warning: "hsl(35, 90%, 60%)",
                error: "hsl(0, 75%, 60%)",
                bg: {
                    dark: "hsl(240, 15%, 8%)",
                    card: "hsl(240, 12%, 12%)",
                    elevated: "hsl(240, 10%, 16%)",
                },
                text: {
                    primary: "hsl(0, 0%, 98%)",
                    secondary: "hsl(0, 0%, 70%)",
                    muted: "hsl(0, 0%, 50%)",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, hsl(250, 85%, 60%) 0%, hsl(280, 80%, 65%) 100%)",
                "gradient-accent": "linear-gradient(135deg, hsl(190, 85%, 55%) 0%, hsl(250, 85%, 60%) 100%)",
                "gradient-mesh": `radial-gradient(at 0% 0%, hsla(250, 80%, 50%, 0.15) 0px, transparent 50%),
                          radial-gradient(at 100% 0%, hsla(280, 80%, 50%, 0.15) 0px, transparent 50%),
                          radial-gradient(at 100% 100%, hsla(190, 80%, 50%, 0.15) 0px, transparent 50%)`,
            },
            animation: {
                "fade-in-up": "fadeInUp 0.6s ease-out",
                "spin": "spin 0.6s linear infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
