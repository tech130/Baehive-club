import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx,js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Design system colors from Figma
        'pink-primary': '#D14E9A',
        'coral-primary': '#FF566D',
        'accent-orange': '#EA7800',
        'text-dark': '#141414',
        'text-light': '#363636',
        'text-muted': '#64607D',
        'bg-cream': '#FFFCFC',
        'bg-light': '#FFFAFA',
        'bg-beige': '#F8F1EC',
        'border-pink': '#FFD3D3',
        'star-yellow': '#F4E112',
        
        // Existing shadcn colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        backgroundSize: {
    '400': '400% 100%',
  },
      },
      fontFamily: {
        'visby': ['Visby', 'system-ui', 'sans-serif'],
        'manrope': ['Manrope', 'system-ui', 'sans-serif'],
        'kraskario': ['Kraskario', 'system-ui', 'sans-serif'],
        'urbanist': ['Urbanist', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'libre': ['Libre Franklin', 'system-ui', 'sans-serif'],
        'baskerville': ['Baskerville Old Face', 'serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(98deg, #D14E9A 14%, #FF566D 73.56%)',
        'gradient-cta': 'linear-gradient(98deg, #D14E9A 14%, #FF566D 60%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        "slide-left": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "slide-right": {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        "fade-in": {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "scale-in": {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        "draw": {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
         gradientMove: {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float 4s ease-in-out infinite",
        "float-slower": "float 5s ease-in-out infinite",
        "slide-left": "slide-left 30s linear infinite",
        "slide-right": "slide-right 30s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "draw": "draw 2s ease-out forwards",
        "gradient": "gradientMove 4s ease-in-out infinite",
      },


    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
