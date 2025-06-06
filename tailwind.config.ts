
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
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF'
				},
				upi: {
					blue: '#1E40AF',
					light: '#3B82F6',
					green: '#10B981',
					background: '#F0F9FF'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			spacing: {
				'safe-area-inset-top': 'env(safe-area-inset-top)',
				'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
				'safe-area-inset-left': 'env(safe-area-inset-left)',
				'safe-area-inset-right': 'env(safe-area-inset-right)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				// Mobile-optimized font sizes
				'mobile-xs': ['0.75rem', { lineHeight: '1.2rem' }],
				'mobile-sm': ['0.875rem', { lineHeight: '1.4rem' }],
				'mobile-base': ['1rem', { lineHeight: '1.6rem' }],
				'mobile-lg': ['1.125rem', { lineHeight: '1.8rem' }],
			},
			screens: {
				'xs': '375px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				// Mobile-specific breakpoints
				'mobile-s': '320px',
				'mobile-m': '375px',
				'mobile-l': '425px',
				'tablet': '768px',
				'laptop': '1024px',
				'laptop-l': '1440px',
				'4k': '2560px',
				// Orientation queries
				'landscape': { 'raw': '(orientation: landscape)' },
				'portrait': { 'raw': '(orientation: portrait)' },
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'blob': {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)'
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				// Mobile-specific animations
				'mobile-slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'mobile-fade-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'blob': 'blob 7s infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				// Mobile-optimized animations
				'mobile-slide-up': 'mobile-slide-up 0.4s ease-out',
				'mobile-fade-in': 'mobile-fade-in 0.3s ease-out',
			},
			animationDelay: {
				'75': '75ms',
				'100': '100ms',
				'150': '150ms',
				'200': '200ms',
				'300': '300ms',
				'500': '500ms',
				'700': '700ms',
				'1000': '1000ms',
				'2000': '2000ms',
				'4000': '4000ms'
			},
			// Mobile-specific utilities
			minHeight: {
				'touch': '44px',
				'mobile-screen': '100svh',
			},
			minWidth: {
				'touch': '44px',
			},
			maxHeight: {
				'mobile-screen': '100svh',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				// Animation delay utilities
				'.animation-delay-75': {
					'animation-delay': '75ms',
				},
				'.animation-delay-100': {
					'animation-delay': '100ms',
				},
				'.animation-delay-150': {
					'animation-delay': '150ms',
				},
				'.animation-delay-200': {
					'animation-delay': '200ms',
				},
				'.animation-delay-300': {
					'animation-delay': '300ms',
				},
				'.animation-delay-500': {
					'animation-delay': '500ms',
				},
				'.animation-delay-700': {
					'animation-delay': '700ms',
				},
				'.animation-delay-1000': {
					'animation-delay': '1000ms',
				},
				'.animation-delay-2000': {
					'animation-delay': '2000ms',
				},
				'.animation-delay-4000': {
					'animation-delay': '4000ms',
				},
				// Mobile-specific utilities
				'.touch-manipulation': {
					'touch-action': 'manipulation',
				},
				'.tap-highlight-transparent': {
					'-webkit-tap-highlight-color': 'transparent',
				},
				'.scroll-smooth': {
					'scroll-behavior': 'smooth',
				},
				'.overscroll-contain': {
					'overscroll-behavior': 'contain',
				},
				// Safe area utilities
				'.pt-safe': {
					'padding-top': 'env(safe-area-inset-top)',
				},
				'.pb-safe': {
					'padding-bottom': 'env(safe-area-inset-bottom)',
				},
				'.pl-safe': {
					'padding-left': 'env(safe-area-inset-left)',
				},
				'.pr-safe': {
					'padding-right': 'env(safe-area-inset-right)',
				},
				'.p-safe': {
					'padding-top': 'env(safe-area-inset-top)',
					'padding-bottom': 'env(safe-area-inset-bottom)',
					'padding-left': 'env(safe-area-inset-left)',
					'padding-right': 'env(safe-area-inset-right)',
				},
				// Mobile viewport utilities
				'.h-screen-mobile': {
					'height': '100svh',
				},
				'.min-h-screen-mobile': {
					'min-height': '100svh',
				},
				'.max-h-screen-mobile': {
					'max-height': '100svh',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
