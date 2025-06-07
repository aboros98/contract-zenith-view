
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
				sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
				display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '-0.005em' }],
				'sm': ['0.875rem', { lineHeight: '1.4', letterSpacing: '-0.006em' }],
				'base': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.011em' }],
				'lg': ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
				'xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.017em' }],
				'2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
				'3xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.028em' }],
				'4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.032em' }],
				'5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
			},
			fontWeight: {
				'light': '300',
				'normal': '400',
				'medium': '500',
				'semibold': '600',
				'bold': '700',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
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
				// Tesla/Apple inspired colors
				electric: {
					50: '#ecfeff',
					100: '#cffafe',
					200: '#a5f3fc',
					300: '#67e8f9',
					400: '#22d3ee',
					500: '#00d4ff',
					600: '#0891b2',
					700: '#0e7490',
					800: '#155e75',
					900: '#164e63',
				},
				purple: {
					50: '#faf5ff',
					100: '#f3e8ff',
					200: '#e9d5ff',
					300: '#d8b4fe',
					400: '#c084fc',
					500: '#8b5cf6',
					600: '#a855f7',
					700: '#9333ea',
					800: '#7c3aed',
					900: '#6b21a8',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
			},
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
				'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'scale-in': 'scaleIn 0.2s ease-out',
				'shimmer': 'shimmer 1.5s infinite',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
