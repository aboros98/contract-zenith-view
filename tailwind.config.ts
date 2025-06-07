
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				serif: ['Playfair Display', 'serif'],
				sans: ['Inter', 'sans-serif'],
			},
			fontSize: {
				'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
				'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'navy': {
					50: 'rgb(var(--navy-50))',
					100: 'rgb(var(--navy-100))',
					200: 'rgb(var(--navy-200))',
					300: 'rgb(var(--navy-300))',
					400: 'rgb(var(--navy-400))',
					500: 'rgb(var(--navy-500))',
					600: 'rgb(var(--navy-600))',
					700: 'rgb(var(--navy-700))',
					800: 'rgb(var(--navy-800))',
					900: 'rgb(var(--navy-900))',
				},
				'gold': {
					50: 'rgb(var(--gold-50))',
					100: 'rgb(var(--gold-100))',
					200: 'rgb(var(--gold-200))',
					300: 'rgb(var(--gold-300))',
					400: 'rgb(var(--gold-400))',
					500: 'rgb(var(--gold-500))',
					600: 'rgb(var(--gold-600))',
					700: 'rgb(var(--gold-700))',
					800: 'rgb(var(--gold-800))',
					900: 'rgb(var(--gold-900))',
				},
				'warm': {
					50: 'rgb(var(--warm-50))',
					100: 'rgb(var(--warm-100))',
					200: 'rgb(var(--warm-200))',
					300: 'rgb(var(--warm-300))',
					400: 'rgb(var(--warm-400))',
					500: 'rgb(var(--warm-500))',
					600: 'rgb(var(--warm-600))',
					700: 'rgb(var(--warm-700))',
					800: 'rgb(var(--warm-800))',
					900: 'rgb(var(--warm-900))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'premium': 'var(--shadow-premium)',
				'premium-lg': 'var(--shadow-premium-lg)',
				'premium-xl': 'var(--shadow-premium-xl)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
